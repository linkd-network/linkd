import { AccountCreateTransaction, AccountId, AccountInfoQuery, Hbar, PrivateKey, TokenCreateTransaction, TokenId, TokenMintTransaction, TokenSupplyType, TokenType } from '@hashgraph/sdk';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
const { Client } = require("@hashgraph/sdk");
require("dotenv").config();

@Controller('sc')
export class SmartContractController {

    // constructor(private trackingService: TrackingService) { }
    @Post()
    async postNFT() {
        const client = Client.forTestnet();
        const supplyKey = PrivateKey.generate();

        const myAccountId = process.env.HEDERA_ACCOUNTID
        const publicKey = process.env.HEDERA_PUBLICKEY
        const privateKey = process.env.HEDERA_PRIVATEKEY;
        client.setOperator(myAccountId, privateKey);




        //Create an account
        const accountPrivateKey = PrivateKey.generateECDSA();

        const createAccountTransaction = new AccountCreateTransaction()
            .setKey(accountPrivateKey.publicKey)
            .setInitialBalance(new Hbar(1000));

        //Sign the transaction with the client operator private key and submit to a Hedera network
        const createAccountTxResponse = await createAccountTransaction.execute(client);

        //Request the receipt of the transaction
        const createAccountReceipt = await createAccountTxResponse.getReceipt(client);

        //Get the account ID
        const newAccountId = createAccountReceipt.accountId;
        console.log('Create an account');


        // Query the account

        const query = new AccountInfoQuery()
            .setAccountId(newAccountId);

        //Sign with client operator private key and submit the query to a Hedera network
        const accountInfo = await query.execute(client);

        //Print the account info to the console
        console.log(accountInfo);


        // // Create NFT 
        const treasuryId = AccountId.fromString(myAccountId);
        const treasuryKey = PrivateKey.fromString(privateKey);


        let nftCreate = await new TokenCreateTransaction()
            .setTokenName("diploma")
            .setTokenSymbol("GRAD")
            .setTokenType(TokenType.NonFungibleUnique)
            .setDecimals(0)
            .setInitialSupply(0)
            .setTreasuryAccountId(treasuryId)
            .setSupplyType(TokenSupplyType.Finite)
            .setMaxSupply(250)
            .setSupplyKey(supplyKey)
            .freezeWith(client);


        // //Sign the transaction with the treasury key
        let nftCreateTxSign = await nftCreate.sign(treasuryKey);

        // //Submit the transaction to a Hedera network
        let nftCreateSubmit = await nftCreateTxSign.execute(client);

        // //Get the transaction receipt
        let nftCreateRx = await nftCreateSubmit.getReceipt(client);

        // //Get the token ID
        let tokenId = nftCreateRx.tokenId;

        // //Log the token ID
        console.log(`- Created NFT with Token ID: ${tokenId} \n`);




        // console.log(!!privateKey);


        // const tokenIdFromString = TokenId.fromString("0.0.3");
        // console.log('tokenIdFromString', tokenIdFromString.toString());


        // //Mint another 1,000 tokens and freeze the unsigned transaction for manual signing
        // const transaction = await new TokenMintTransaction()
        //     .setTokenId(tokenIdFromString)
        //     .setAmount(1000)
        //     .freezeWith(client);
        // console.log('new Token Mint Transaction', transaction);

        // //Sign with the supply private key of the token 
        // const signTx = await transaction.sign(supplyKey);

        // console.log('new signTx', signTx);


        // //Submit the transaction to a Hedera network    
        // const txResponse = await signTx.execute(client);

        // console.log('new txResponse', txResponse);
        // //Request the receipt of the transaction
        // const receipt = await txResponse.getReceipt(client);
        // console.log('new receipt', receipt);

        // //Get the transaction consensus status
        // const transactionStatus = receipt.status;

        // console.log("The transaction consensus status " + transactionStatus.toString());

        //v2.0.7

    }

    // @Post('event')
    // async postEvent(payload) {


    //     let eventList: TrackerEvent[] = [
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.View,
    //             date: new Date().getTime() - 3
    //         },
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.View,
    //             date: new Date().getTime() - 2
    //         },
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.View,
    //             date: new Date().getTime() - 1
    //         },
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.Click,
    //             date: new Date().getTime() - 10
    //         }, {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.Click,
    //             date: new Date().getTime()
    //         }
    //     ]
    //     await this.producerService.produce({
    //         record: {
    //             topic: KafkaTopic.SCEvents,
    //             messages: eventList.map(x => {
    //                 return { value: JSON.stringify(x) }
    //             })
    //         }
    //     })

    //     return { success: true };
    // }
}
