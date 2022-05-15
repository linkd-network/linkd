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
    PublicKey,
    TransferTransaction,
    ContractCallQuery,
    ContractInfoQuery
} from '@hashgraph/sdk'
import { Injectable } from '@nestjs/common';
const fs = require("fs");
const path = require("path");

const HEDERA_ACCOUNTID = process.env.HEDERA_ACCOUNTID;
const HEDERA_PUBLICKEY = process.env.HEDERA_PUBLICKEY;
const HEDERA_PRIVATEKEY = process.env.HEDERA_PRIVATEKEY;
console.log();

@Injectable()
export class HederaAPIService {
    private readonly client = Client.forTestnet().setOperator(
        AccountId.fromString(HEDERA_ACCOUNTID),
        PrivateKey.fromString(HEDERA_PRIVATEKEY)
    );


    public async triggerEvent({ contractId, eventType }: { contractId: ContractId, accountId: AccountId, eventType: string }) {
        const { treasuryId, treasuryKey } = this.getTreasuryDetails();

        const contractExecTx2 = await new ContractExecuteTransaction()
            .setContractId(contractId)
            .setGas(3000000)
            .setFunction(
                "eventTrigger",
                new ContractFunctionParameters()
                    .addString(eventType)
            )
            .freezeWith(this.client);
        const contractExecSign2 = await contractExecTx2.sign(treasuryKey);
        const contractExecSubmit2 = await contractExecSign2.execute(this.client);
        const contractExecRx2 = await contractExecSubmit2.getReceipt(this.client);
        await this.getContractBalance({ contractId })
    }

    public async createAccount() {
        const newAccountPrivateKey = await PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(new Hbar(0))
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
                "associateSubscriber",
                new ContractFunctionParameters().addAddress(accountId.toSolidityAddress())
            )
            .freezeWith(this.client);
        const contractExecSign1 = await contractExecTx1.sign(accountKey);

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

    public async publishSmartContract({ amountPerEvent, budget, eventType }: { budget: number, amountPerEvent: number, eventType: string }) {
        const { bytecodeFileId } = await this.createSolidityFileInHedera();
        const { contractId } = await this.createSmartContract({
            bytecodeFileId,
            amountPerEvent,
            eventType
        })

        const { status } = await this.loadHbarsToContract({ contractId, budget });
        await this.getContractBalance({ contractId });
        return { contractId: contractId.toStringWithChecksum(this.client) };
    }

    private async createSmartContract({ bytecodeFileId, amountPerEvent, eventType }): Promise<{ contractId: ContractId }> {

        // Create the smart contract
        const contractInstantiateTx = new ContractCreateTransaction()
            .setBytecodeFileId(bytecodeFileId)
            .setGas(3000000)
            .setConstructorParameters(new ContractFunctionParameters().addUint256(amountPerEvent).addString(eventType));
        const contractInstantiateSubmit = await contractInstantiateTx.execute(this.client);
        const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(this.client);

        const contractId = contractInstantiateRx.contractId;

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


    public async checkBalance({ accountId }: { accountId: AccountId }) {
        //Create the account balance query
        const query = new AccountBalanceQuery()
            .setAccountId(accountId);

        //Submit the query to a Hedera network
        const accountBalance = await query.execute(this.client);

        //Print the balance of hbars
        return { balance: accountBalance.hbars.toString() }
    }

    //v2.0.7    }

    public async loadHbarsToContract({ contractId, budget }: { contractId: ContractId, budget: number }) {
        const { treasuryId, treasuryKey } = this.getTreasuryDetails();


        // Transfer HBAR to smart contract using TransferTransaction()
        const contractExecuteTx = new TransferTransaction()
            .addHbarTransfer(treasuryId, -budget)
            .addHbarTransfer(<any>contractId, budget)
            .freezeWith(this.client);
        const contractExecuteSign = await contractExecuteTx.sign(treasuryKey);
        const contractExecuteSubmit = await contractExecuteSign.execute(this.client);
        const contractExecuteRx = await contractExecuteSubmit.getReceipt(this.client);
        console.log(`- Crypto transfer to contract: ${contractExecuteRx.status} \n`);

        return { status: contractExecuteRx.status };
    }

    public async getContractDetails({ contractId }: { contractId: ContractId }) {
        const contractQueryTx = new ContractCallQuery()
            .setContractId(contractId)
            .setGas(3000000)
            .setQueryPayment(new Hbar(1))
            .setFunction("getPastEvents");
        const contractQuerySubmit = await contractQueryTx.execute(this.client);
        const contractQueryResult: string = contractQuerySubmit.getString();
        const output: string[] = contractQueryResult.slice(0, -1).split(',');
        return { events: output };
    }


    public async getContractBalance({ contractId }: { contractId: ContractId }) {
        const cCheck = await new ContractInfoQuery().setContractId(contractId).execute(this.client);
        return { balance: cCheck.balance.toString() }
    }

}