console.clear();
require("dotenv").config();
const {
    Client,
    AccountId,
    PrivateKey,
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
} = require("@hashgraph/sdk");
const fs = require("fs");


const HEDERA_ACCOUNTID = '0.0.34280259'
const HEDERA_PUBLICKEY = '302a300506032b65700321003e0ad6a091bfb42a25ec5859a4003474cc4723e55d3107c7e6493e9109de3c99'
const HEDERA_PRIVATEKEY = '302e020100300506032b6570042204208ffe69118a4db78c83e54b268ccc1164c9e7e66330861e46f40143cfd4eadea9'



const operatorId = AccountId.fromString(HEDERA_ACCOUNTID)
const operatorKey = PrivateKey.fromString(HEDERA_PRIVATEKEY)
const treasuryId = AccountId.fromString(HEDERA_ACCOUNTID);
const treasuryKey = PrivateKey.fromString(HEDERA_PRIVATEKEY)


const initialTokenSupply = 1000;
const amountPerEvent = 50;



const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function transferContract({ contractId, treasuryId, treasuryKey, accountId, client }) {

    const contractExecTx2 = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(3000000)
        .setFunction(
            "tokenTransfer",
            new ContractFunctionParameters()
                .addAddress(treasuryId.toSolidityAddress())
                .addAddress(accountId.toSolidityAddress())
        )
        .freezeWith(client);
    const contractExecSign2 = await contractExecTx2.sign(treasuryKey);
    const contractExecSubmit2 = await contractExecSign2.execute(client);
    const contractExecRx2 = await contractExecSubmit2.getReceipt(client);


}


async function main() {

    // STEP 1 =================================== Create tokens
    const { tokenId, tokenAddressSol } = await createTokens({ treasuryId, treasuryKey, client })
    console.log(`STEP 1 =================================== BE: Token Created with initial token supply of ${initialTokenSupply}`);


    // STEP 2 =================================== Create Accounts

    let matan = await createAccount({ client });
    const matanId = matan.receipt.accountId;
    const matanKey = matan.key;

    let dean = await createAccount({ client });
    const deanId = dean.receipt.accountId;
    const deanKey = dean.key;
    console.log(`STEP 2 =================================== BE: Accounts Created`);


    console.log(`STEP 3 =================================== WEB: Matan published new ad (New Contract)`);

    // STEP 3 =================================== Create Smart contract
    const { contractId } = await createSmartContract({ treasuryKey, client, tokenAddressSol })
    console.log(`STEP 4 =================================== BE: Smart Contract Created`);


    console.log(`STEP 4 =================================== WEB: Dean subscribe to this contract`);
    // STEP 4 =================================== Associate contract with Matan
    await associateSmartContract({ contractId, accountId: deanId, accountKey: deanKey, client })
    console.log(`STEP 5 =================================== BE: Associate Contract Associated with Dean`);



    console.log(`STEP 6 =================================== Visibility Log: Show all users state of linked tokens`);
    await showAllUsersState({ treasuryId, matanId, deanId, tokenId })


    console.log(`STEP 7 =================================== Tracing Script: Dean published NFT in his site`);
    console.log(`STEP 8 =================================== Tracing Script: Dean website trigger click event`);


    // STEP 8 =================================== Execute token transfer 
    await transferContract({ contractId, treasuryId, treasuryKey, accountId: deanId, client })
    console.log(`STEP 9 ===================================  BE: Token Transfer Execute to Dean`);

    console.log(`STEP 10 =================================== Visibility Log: Show all users state of linked tokens`);
    await showAllUsersState({ treasuryId, matanId, deanId, tokenId })
    //Execute a contract function (transfer)


    // ========================================
    // FUNCTIONS

    async function showAllUsersState({ treasuryId, matanId, deanId, tokenId }) {
        const tB = await bCheckerFcn(treasuryId);
        const aB = await bCheckerFcn(matanId);
        const dB = await bCheckerFcn(deanId);
        console.log(`- Treasury balance: ${tB} units of token ${tokenId}`);
        console.log(`- Matan balance: ${aB} units of token ${tokenId} \n`);
        console.log(`- Dean balance: ${dB} units of token ${tokenId} \n`);

    }

    async function bCheckerFcn(aId) {
        let balanceCheckTx = await new AccountBalanceQuery().setAccountId(aId).execute(client);
        return balanceCheckTx.tokens._map.get(tokenId.toString()) ?? 0;
    }

    async function createAccount({ client }) {
        const newAccountPrivateKey = await PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(Hbar.fromTinybars(1000))
            .execute(client)


        // Get the new account ID
        const getReceipt = await newAccount.getReceipt(client);
        return { receipt: getReceipt, key: newAccountPrivateKey };
    }


    async function createTokens({ treasuryId, treasuryKey, client }) {
        const tokenCreateTx = await new TokenCreateTransaction()
            .setTokenName("linkedCo")
            .setTokenSymbol("LNKC")
            .setDecimals(0)
            .setInitialSupply(initialTokenSupply)
            .setTreasuryAccountId(treasuryId)
            .setAdminKey(treasuryKey)
            .setSupplyKey(treasuryKey)
            .freezeWith(client)
            .sign(treasuryKey);
        const tokenCreateSubmit = await tokenCreateTx.execute(client);
        const tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
        const tokenId = tokenCreateRx.tokenId;
        const tokenAddressSol = tokenId.toSolidityAddress();
        return { tokenId, tokenAddressSol }
    }

    async function createSmartContract({ treasuryKey, client, tokenAddressSol }) {
        const bytecode = fs.readFileSync("./MintAssociateTransferHTS_sol_MintAssoTransHTS.bin");
        //Create a file on Hedera and store the contract bytecode
        const fileCreateTx = new FileCreateTransaction().setKeys([treasuryKey]).freezeWith(client);
        const fileCreateSign = await fileCreateTx.sign(treasuryKey);
        const fileCreateSubmit = await fileCreateSign.execute(client);
        const fileCreateRx = await fileCreateSubmit.getReceipt(client);
        const bytecodeFileId = fileCreateRx.fileId;

        // Append contents to the file
        const fileAppendTx = new FileAppendTransaction()
            .setFileId(bytecodeFileId)
            .setContents(bytecode)
            .setMaxChunks(10)
            .freezeWith(client);
        const fileAppendSign = await fileAppendTx.sign(treasuryKey);
        const fileAppendSubmit = await fileAppendSign.execute(client);
        const fileAppendRx = await fileAppendSubmit.getReceipt(client);

        // Create the smart contract
        const contractInstantiateTx = new ContractCreateTransaction()
            .setBytecodeFileId(bytecodeFileId)
            .setGas(3000000)
            .setConstructorParameters(new ContractFunctionParameters().addAddress(tokenAddressSol).addInt64(amountPerEvent));
        const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
        const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
        const contractId = contractInstantiateRx.contractId;
        const contractAddress = contractId.toSolidityAddress();


        // Update the fungible so the smart contract manages the supply
        const tokenUpdateTx = await new TokenUpdateTransaction()
            .setTokenId(tokenId)
            .setSupplyKey(contractId)
            .freezeWith(client)
            .sign(treasuryKey);
        const tokenUpdateSubmit = await tokenUpdateTx.execute(client);
        const tokenUpdateRx = await tokenUpdateSubmit.getReceipt(client);
        return { contractId }
    }

    async function associateSmartContract({ contractId, accountId, accountKey, client }) {

        // Execute a contract function (mint)
        // const contractExecTx = await new ContractExecuteTransaction()
        // 	.setContractId(contractId)
        // 	.setGas(3000000)
        // 	.setFunction("mintFungibleToken", new ContractFunctionParameters().addUint64(150));
        // const contractExecSubmit = await contractExecTx.execute(client);
        // const contractExecRx = await contractExecSubmit.getReceipt(client);
        // console.log(`- New tokens minted: ${contractExecRx.status.toString()}`);

        // // Token query 3
        // const tokenInfo3 = await tQueryFcn(tokenId);
        // console.log(`- New token supply: ${tokenInfo3.totalSupply.low} \n`);



        const contractExecTx1 = await new ContractExecuteTransaction()
            .setContractId(contractId)
            .setGas(3000000)
            .setFunction(
                "tokenAssociate",
                new ContractFunctionParameters().addAddress(accountId.toSolidityAddress())
            )
            .freezeWith(client);
        const contractExecSign1 = await contractExecTx1.sign(accountKey);
        const contractExecSubmit1 = await contractExecSign1.execute(client);
        const contractExecRx1 = await contractExecSubmit1.getReceipt(client);

    }



}


main();
