const {
    Client,
    CustomRoyaltyFee,
    CustomFixedFee,
    Hbar,
    FileAppendTransaction,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    PrivateKey,
    AccountCreateTransaction,
    PublicKey,
    AccountId,
    TokenInfoQuery,
    TokenMintTransaction,
    AccountUpdateTransaction,
    AccountBalanceQuery,
    TransferTransaction,
    FileCreateTransaction,
    ContractExecuteTransaction,
    ContractCreateTransaction,
    ContractFunctionParameters,
    ContractCallQuery
} = require("@hashgraph/sdk");
require("dotenv").config();
let fs = require('fs');
const HEDERA_ACCOUNTID = '0.0.34280259'
const HEDERA_PUBLICKEY = '302a300506032b65700321003e0ad6a091bfb42a25ec5859a4003474cc4723e55d3107c7e6493e9109de3c99'
const HEDERA_PRIVATEKEY = '302e020100300506032b6570042204208ffe69118a4db78c83e54b268ccc1164c9e7e66330861e46f40143cfd4eadea9'

async function main() {

    //Grab your Hedera testnet account ID and private key from your .env file


    const operatorId = AccountId.fromString(HEDERA_ACCOUNTID)
    const operatorKey = PrivateKey.fromString(HEDERA_PRIVATEKEY)
    const treasuryId = AccountId.fromString(HEDERA_ACCOUNTID);
    const treasuryKey = PrivateKey.fromString(HEDERA_PRIVATEKEY)
    const client = Client.forTestnet();

    const supplyKey = PrivateKey.generate();
    const adminKey = PrivateKey.generate();



    client.setOperator(operatorId, operatorKey);


    let matanAccount = await createAccount({ client });
    let deanAccount = await createAccount({ client });

    // ------------------ Create tokens (Such as Habr) -------------------------
    let tokens = []
    // for (let i = 0; i < 10; i++) {

    // Create tokens
    // CREATE FUNGIBLE TOKEN (STABLECOIN)
    let tokenCreateTx = await new TokenCreateTransaction()
        .setTokenName("USD Bar")
        .setTokenSymbol("USDB")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(2)
        .setInitialSupply(10000)
        .setTreasuryAccountId(treasuryId)
        .setSupplyType(TokenSupplyType.Infinite)
        .setSupplyKey(supplyKey)
        .freezeWith(client);

    //SIGN WITH TREASURY KEY
    let tokenCreateSign = await tokenCreateTx.sign(treasuryKey);

    //SUBMIT THE TRANSACTION
    let tokenCreateSubmit = await tokenCreateSign.execute(client);

    //GET THE TRANSACTION RECEIPT
    let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);

    //GET THE TOKEN ID
    let tokenId = tokenCreateRx.tokenId;
    tokens.push(tokenId)
    //LOG THE TOKEN ID TO THE CONSOLE
    console.log(`- Created token with ID: ${tokenId} \n`);

    // }

    const tokenAddressSol = tokenId.toSolidityAddress();


    // ----------------- Create Smart contract ---------------------

    //Create a file on Hedera and store the contract bytecode
    const bytecode = fs.readFileSync('./LookupCode_sol_LookupContract.bin');


    const fileCreateTx = new FileCreateTransaction()
        .setKeys([treasuryKey])
        .freezeWith(client);
    const fileCreateSign = await fileCreateTx.sign(treasuryKey);
    const fileCreateSubmit = await fileCreateSign.execute(client);
    const fileCreateRx = await fileCreateSubmit.getReceipt(client);
    const bytecodeFileId = fileCreateRx.fileId;
    console.log(`- The smart contract bytecode file ID is ${bytecodeFileId}`);

    // Append contents to the file
    const fileAppendTx = new FileAppendTransaction()
        .setFileId(bytecodeFileId)
        .setContents(bytecode)
        .setMaxChunks(10)
        .freezeWith(client);
    const fileAppendSign = await fileAppendTx.sign(treasuryKey);
    const fileAppendSubmit = await fileAppendSign.execute(client);
    const fileAppendRx = await fileAppendSubmit.getReceipt(client);
    console.log(`- Content added: ${fileAppendRx.status} \n`);





    console.log(`STEP 3 ===================================`);
    console.log(tokenAddressSol);
    // Create the smart contract
    const contractInstantiateTx = new ContractCreateTransaction()
        .setBytecodeFileId(bytecodeFileId)
        .setGas(3000000)
        // .setConstructorParameters(new ContractFunctionParameters().addAddressArray(tokenAddressSol));

    const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
    const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
    // const contractId = contractInstantiateRx.contractId;
    // const contractAddress = contractId.toSolidityAddress();
    console.log(`- The smart contract ID is: ${contractId}`);
    console.log(`- The smart contract ID in Solidity format is: ${contractAddress} \n`);





    //Execute a contract function (transfer)
    const contractExecTx2 = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(3000000)
        .setFunction(
            "tokenTransfer",
            new ContractFunctionParameters()
                .addAddress(treasuryId.toSolidityAddress())
                .addAddress(matanAccount.receipt.accountId.toSolidityAddress())
                .addInt64(50)
        )
        .freezeWith(client);
    const contractExecSign2 = await contractExecTx2.sign(treasuryKey);
    const contractExecSubmit2 = await contractExecSign2.execute(client);
    const contractExecRx2 = await contractExecSubmit2.getReceipt(client);

    console.log(`- Token transfer from Treasury to Alice: ${contractExecRx2.status.toString()}`);

    const tB = await bCheckerFcn(treasuryId);
    const aB = await bCheckerFcn(matanAccount.receipt.accountId);
    console.log(`- Treasury balance: ${tB} units of token ${tokenId}`);
    console.log(`- Alice balance: ${aB} units of token ${tokenId} \n`);






    //     // FUNCTIONS
    //     async function tQueryFcn(tId) {
    //         let info = await new TokenInfoQuery().setTokenId(tId).execute(client);
    //         return info;
    //     }

    //     async function bCheckerFcn(aId) {
    //         let balanceCheckTx = await new AccountBalanceQuery().setAccountId(aId).execute(client);
    //         return balanceCheckTx.tokens._map.get(tokenId.toString());
    //     }




    //     // Import the compiled contract bytecode 

    //     const fileCreateTx = new FileCreateTransaction()
    //         .setContents(contractByteCode)
    //         .setKeys([operatorKey])
    //         .freezeWith(client);
    //     const fileCreateSign = await fileCreateTx.sign(operatorKey);
    //     const fileCreateSubmit = await fileCreateSign.execute(client);

    //     const fileCreateRx = await fileCreateSubmit.getReceipt(client);

    //     const byteCodeFileId = fileCreateRx.fileId;
    //     console.log(`The bytecode file id is: ${byteCodeFileId}`);


    //     // Instactuate the smart contract 
    //     const contractInstantiateTx = new ContractCreateTransaction()
    //         .setBytecodeFileId(byteCodeFileId)
    //         .setGas(1000000)
    //         .setConstructorParameters(new ContractFunctionParameters().addString('Matan').addUint256(111111))
    //     const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
    //     const contractInstantiateRX = await contractInstantiateSubmit.getReceipt(client);
    //     const contractId = contractInstantiateRX.contractId;
    //     const contractAddress = contractId.toSolidityAddress()

    //     console.log(`The smart contract id: ${contractId}`);
    //     console.log(`The smart contract id id solidity: ${contractAddress}`);

    //     // Query the contract to check changes in state variable 
    //     const contractQueryTX = new ContractCallQuery()
    //         .setContractId(contractId)
    //         .setGas(100000)
    //         .setFunction("getMobileNumber", new ContractFunctionParameters().addString('Matan'))

    //     const contractQuerySubmit = await contractQueryTX.execute(client);
    //     const contractQueryResult = await contractQuerySubmit.getUint256(0);

    //     console.log(` Here's the phone number of Matan: ${contractQueryResult}`);

    //     // Call contract function to update state variable
    //     const contractExecuteTx = new ContractExecuteTransaction()
    //         .setContractId(contractId)
    //         .setGas(10000)
    //         .setFunction(
    //             'setMobileNumber',
    //             new ContractFunctionParameters().addString('Dean').addUint256(22222)
    //         )

    //     const contractExecuteSubmit = await contractExecuteTx.execute(client);
    //     const contractExecuteRx = await contractExecuteSubmit.getReceipt();
    //     console.log(`Contract function call status ${contractExecuteRx}`);

    //     // Call contact and check new record
    //     const contractQueryTX1 = new ContractCallQuery()
    //         .setContractId(contractId)
    //         .setGas(100000)
    //         .setFunction("getMobileNumber", new ContractFunctionParameters().addString('Dean'))

    //     const contractQuerySubmit1 = await contractQueryTX1.execute(client);
    //     const contractQueryResult1 = await contractQuerySubmit1.getUint256(0);

    //     console.log(` Here's the phone number of Matan: ${contractQueryResult1}`);












    //     let matanAccount = await createAccount({ client });
    //     let deanAccount = await createAccount({ client });

    //     const cid = [
    //         'QmYq2YBt1kk2i7Muj8ZDkfCcRDmbn1AnRbaSKuFZVpbJz5'
    //     ];



    //     // ------------------------- MINT NFT ---------------------------------

    //     //Define custom fee schedule
    //     let nftCustomFee = await new CustomRoyaltyFee()
    //         .setNumerator(5)
    //         .setDenominator(10)
    //         .setFeeCollectorAccountId(treasuryId)
    //         .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(200)));

    //     // CREATE NFT CUSTOM FEE 
    //     let nftCreate = await new TokenCreateTransaction()
    //         .setTokenName('FE Libs')
    //         .setTokenSymbol('Angular')
    //         .setTokenType(TokenType.NonFungibleUnique)
    //         .setDecimals(0)
    //         .setInitialSupply(0)
    //         .setTreasuryAccountId(treasuryId)
    //         .setSupplyKey(TokenSupplyType.Finite)
    //         .setCustomFees([nftCustomFee])
    //         .setAdminKey(adminKey)
    //         .setSupplyKey(supplyKey)
    //         .freezeWith(client)
    //         .sign(treasuryKey);

    //     let nftCreateSign = await nftCreate.sign(adminKey);
    //     let nftCreateSubmit = await nftCreateSign.execute(client);
    //     let nftCreateRx = await nftCreateSubmit.getReceipt(client);
    //     const { tokenId } = nftCreateRx
    //     console.log(`Create NFT with Token ID : ${tokenId}`);

    //     new Hbar(20).toSolidityAddress

    //     // // TOKEN QUERY TO CHECK THAT CUSTOM FEE SCHEDULE IS ASSOCIARED WITH NFT 
    //     // let tokenInfo = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
    //     // console.table(tokenInfo.customFees[0])


    //     // MINT NEW BATCH OF NFTs
    //     let nftCollection = []
    //     for (const id of cid) {
    //         let nftRx = await tokenMintTransaction({ cid: id, tokenId, client, supplyKey })
    //         nftCollection.push(nftRx);
    //         console.log(`Create NFT ${tokenId} with serial: ${nftRx.serials[0].low}`);
    //     }


    //     // GET CURRENT TOKEN SUPPLY
    //     let tokenInfo = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
    //     console.log(`Current NFT supply ${tokenInfo.totalSupply}`);

    //     // AUTO ASSOCIATION FOR MATAN ACCOUNT
    //     let associateTx = await new AccountUpdateTransaction()
    //         .setAccountId(matanAccount.receipt.accountId)
    //         .setMaxAutomaticTokenAssociations(100)
    //         .freezeWith(client)
    //         .sign(matanAccount.key);
    //     let associateTxSubmit = await associateTx.execute(client);
    //     let associateRx = await associateTxSubmit.getReceipt(client)
    //     console.log(`Matan NFT auto association: ${associateRx.status}`);



    //     // Print balance for each account
    //     await printBalance({ id: treasuryId, client, tokenId: tokenId, accountName: 'Treasury' });
    //     await printBalance({ id: matanAccount.receipt.accountId, client, tokenId: tokenId, accountName: 'Matan' });

    //     // Transfer NFT from Treasury -> Matan

    //     let tokenTransferTx = await new TransferTransaction()
    //         .addNftTransfer(tokenId, 1, treasuryId, matanAccount.receipt.accountId)
    //         .freezeWith(client)
    //         .sign(treasuryKey)
    //     let tokenTransferSubmit = await tokenTransferTx.execute(client);
    //     let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

    //     console.log(`NFT transfer Treasury --> Matan with status ${tokenTransferRx.status}`);


    //     // Print balance for each account
    //     await printBalance({ id: treasuryId, client, tokenId: tokenId, accountName: 'Treasury' });
    //     await printBalance({ id: matanAccount.receipt.accountId, client, tokenId: tokenId, accountName: 'Matan' });


    // }

    // async function printBalance({ id, client, tokenId, accountName }) {
    //     const { tokens, hbars } = await balanceCheck({ id, client, tokenId })
    //     console.log(`${accountName} Balance : ${tokens} NFTs of ID : ${tokenId} and ${hbars}`);
    // }

    // async function balanceCheck({ id, client, tokenId }) {
    //     let balanceCheckTx = await new AccountBalanceQuery()
    //         .setAccountId(id)
    //         .execute(client);
    //     return {
    //         tokens: balanceCheckTx.tokens._map.get(tokenId.toString()) ?? 0,
    //         hbars: balanceCheckTx.hbars
    //     }

    // }

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

    // async function tokenMintTransaction({ cid, tokenId, client, supplyKey }) {
    //     mintTx = await new TokenMintTransaction()
    //         .setTokenId(tokenId)
    //         .setMetadata([Buffer.from(cid)])
    //         .freezeWith(client);
    //     let mintTxSign = await mintTx.sign(supplyKey)
    //     let mintTxSubmit = await mintTxSign.execute(client)
    //     let mintRx = await mintTxSubmit.getReceipt(client);
    //     return mintRx;
}
main();