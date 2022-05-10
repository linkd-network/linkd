/* eslint-disable prettier/prettier */
import {
    Client,
    AccountId,
    ContractId,
    AccountCreateTransaction,
    TokenCreateTransaction,
    FileCreateTransaction,
    FileAppendTransaction,
    ContractCreateTransaction,
    ContractFunctionParameters,
    TokenUpdateTransaction,
    ContractExecuteTransaction,
    TokenInfoQuery,
    AccountBalanceQuery,
    Hbar,
    TokenId,
    PrivateKey,
    PublicKey
} from '@hashgraph/sdk'
import { Injectable } from '@nestjs/common';
const fs = require("fs");
const path = require("path");

const HEDERA_ACCOUNTID = '0.0.34280259'
const HEDERA_PUBLICKEY = '302a300506032b65700321003e0ad6a091bfb42a25ec5859a4003474cc4723e55d3107c7e6493e9109de3c99'
const HEDERA_PRIVATEKEY = '302e020100300506032b6570042204208ffe69118a4db78c83e54b268ccc1164c9e7e66330861e46f40143cfd4eadea9'


@Injectable()
export class HederaAPIService {
    private readonly client = Client.forTestnet().setOperator(
        AccountId.fromString(HEDERA_ACCOUNTID),
        PrivateKey.fromString(HEDERA_PRIVATEKEY)
    );


    public async triggerPayment({ contractId, accountId }: { contractId: ContractId, accountId: AccountId }) {
        const { treasuryId, treasuryKey } = this.getTreasuryDetails();

        const contractExecTx2 = await new ContractExecuteTransaction()
            .setContractId(contractId)
            .setGas(3000000)
            .setFunction(
                "tokenTransfer",
                new ContractFunctionParameters()
                    .addAddress(treasuryId.toSolidityAddress())
                    .addAddress(accountId.toSolidityAddress())
            )
            .freezeWith(this.client);
        const contractExecSign2 = await contractExecTx2.sign(treasuryKey);
        const contractExecSubmit2 = await contractExecSign2.execute(this.client);
        const contractExecRx2 = await contractExecSubmit2.getReceipt(this.client);
        console.log('payment good');

    }

    public async createAccount() {
        const newAccountPrivateKey = await PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(Hbar.fromTinybars(1000))
            .execute(this.client)


        // Get the new account ID
        const getReceipt = await newAccount.getReceipt(this.client);

        return { accountIdStr: getReceipt.accountId.toStringWithChecksum(this.client), accountId: getReceipt.accountId, key: newAccountPrivateKey };
    }

    public async associateSmartContract({ contractId, accountId, accountKey }: { accountKey: PrivateKey; contractId: ContractId, accountId: TokenId }) {

        const contractExecTx1 = await new ContractExecuteTransaction()
            .setContractId(contractId)
            .setGas(3000000)
            .setFunction(
                "tokenAssociate",
                new ContractFunctionParameters().addAddress(accountId.toSolidityAddress())
            )
            .freezeWith(this.client);
        const contractExecSign1 = await contractExecTx1.sign(accountKey);
        console.log('contractExecSign1');

        const contractExecSubmit1 = await contractExecSign1.execute(this.client);
        const contractExecRx1 = await contractExecSubmit1.getReceipt(this.client);

        console.log('contract is associated');

    }


    private getTreasuryDetails() {
        const treasuryId = AccountId.fromString(HEDERA_ACCOUNTID);
        const treasuryKey = PrivateKey.fromString(HEDERA_PRIVATEKEY)
        return {
            treasuryId,
            treasuryKey
        }
    }

    public async createFungibleToken({ initialTokenSupply }: { initialTokenSupply: number }): Promise<{ tokenId: TokenId, tokenIdString: string }> {
        const { treasuryId, treasuryKey } = this.getTreasuryDetails();
        const tokenCreateTx = await new TokenCreateTransaction()
            .setTokenName("linkdCoin")
            .setTokenSymbol("LNKD")
            .setDecimals(0)
            .setInitialSupply(initialTokenSupply)
            .setTreasuryAccountId(treasuryId)
            .setAdminKey(treasuryKey)
            .setSupplyKey(treasuryKey)
            .freezeWith(this.client)
            .sign(treasuryKey);
        const tokenCreateSubmit = await tokenCreateTx.execute(this.client);
        const tokenCreateRx = await tokenCreateSubmit.getReceipt(this.client);
        const tokenId = tokenCreateRx.tokenId;

        return { tokenId, tokenIdString: tokenId.toStringWithChecksum(this.client) };
    }

    public async publishSmartContract({ amountPerEvent, tokenAddressSol, tokenId }) {
        const { bytecodeFileId } = await this.createSolidityFileInHedera();
        const { contractId } = await this.createSmartContract({
            bytecodeFileId,
            amountPerEvent,
            tokenAddressSol,
            tokenId
        })
        return { contractId: contractId.toStringWithChecksum(this.client) };
    }

    private async createSmartContract({ bytecodeFileId, amountPerEvent, tokenAddressSol, tokenId }): Promise<{ contractId: TokenId }> {
        const { treasuryId, treasuryKey } = this.getTreasuryDetails();

        // Create the smart contract
        const contractInstantiateTx = new ContractCreateTransaction()
            .setBytecodeFileId(bytecodeFileId)
            .setGas(3000000)
            .setConstructorParameters(new ContractFunctionParameters().addAddress(tokenAddressSol).addInt64(amountPerEvent));
        const contractInstantiateSubmit = await contractInstantiateTx.execute(this.client);
        const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(this.client);

        const contractId = contractInstantiateRx.contractId;


        const contractAddress = contractId.toSolidityAddress();


        // Update the fungible so the smart contract manages the supply
        const tokenUpdateTx = await new TokenUpdateTransaction()
            .setTokenId(tokenId)
            .setSupplyKey(contractId)
            .freezeWith(this.client)
            .sign(treasuryKey);
        const tokenUpdateSubmit = await tokenUpdateTx.execute(this.client);
        const tokenUpdateRx = await tokenUpdateSubmit.getReceipt(this.client);
        return { contractId }
    }

    private async createSolidityFileInHedera() {
        // const bytecode = fs.readFileSync("./contract.bin");
        const bytecode = fs.readFileSync(
            path.resolve(
                __dirname,
                './contract.bin',
            ),
        );

        const { treasuryId, treasuryKey } = this.getTreasuryDetails();

        //Create a file on Hedera and store the contract bytecode
        const fileCreateTx = new FileCreateTransaction().setKeys([treasuryKey]).freezeWith(this.client);
        const fileCreateSign = await fileCreateTx.sign(treasuryKey);
        const fileCreateSubmit = await fileCreateSign.execute(this.client);
        const fileCreateRx = await fileCreateSubmit.getReceipt(this.client);
        const bytecodeFileId = fileCreateRx.fileId;

        // Append contents to the file
        const fileAppendTx = new FileAppendTransaction()
            .setFileId(bytecodeFileId)
            .setContents(bytecode)
            .setMaxChunks(10)
            .freezeWith(this.client);
        const fileAppendSign = await fileAppendTx.sign(treasuryKey);
        const fileAppendSubmit = await fileAppendSign.execute(this.client);
        const fileAppendRx = await fileAppendSubmit.getReceipt(this.client);
        console.log(`- Content added: ${fileAppendRx.status} \n`);
        return { bytecodeFileId };
    }
    public async getTreasuryBalance({ tokenId }: { tokenId: TokenId }) {
        const { treasuryId } = this.getTreasuryDetails();
        return await this.checkBalance({ tokenId, accountId: treasuryId })
    }
    public async checkBalance({ accountId, tokenId }: { accountId: AccountId, tokenId: TokenId }) {
        const balanceCheckTx = await new AccountBalanceQuery().setAccountId(accountId).execute(this.client);
        return balanceCheckTx.tokens._map.get(tokenId.toString()) ?? 0;
    }

}