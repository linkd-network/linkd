"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractController = void 0;
const sdk_1 = require("@hashgraph/sdk");
const common_1 = require("@nestjs/common");
const { Client } = require("@hashgraph/sdk");
require("dotenv").config();
let SmartContractController = class SmartContractController {
    async postNFT() {
        const client = Client.forTestnet();
        const supplyKey = sdk_1.PrivateKey.generate();
        const myAccountId = process.env.HEDERA_ACCOUNTID;
        const publicKey = process.env.HEDERA_PUBLICKEY;
        const privateKey = process.env.HEDERA_PRIVATEKEY;
        client.setOperator(myAccountId, privateKey);
        const accountPrivateKey = sdk_1.PrivateKey.generateECDSA();
        const createAccountTransaction = new sdk_1.AccountCreateTransaction()
            .setKey(accountPrivateKey.publicKey)
            .setInitialBalance(new sdk_1.Hbar(1000));
        const createAccountTxResponse = await createAccountTransaction.execute(client);
        const createAccountReceipt = await createAccountTxResponse.getReceipt(client);
        const newAccountId = createAccountReceipt.accountId;
        console.log('Create an account');
        const query = new sdk_1.AccountInfoQuery()
            .setAccountId(newAccountId);
        const accountInfo = await query.execute(client);
        console.log(accountInfo);
        const treasuryId = sdk_1.AccountId.fromString(myAccountId);
        const treasuryKey = sdk_1.PrivateKey.fromString(privateKey);
        let nftCreate = await new sdk_1.TokenCreateTransaction()
            .setTokenName("diploma")
            .setTokenSymbol("GRAD")
            .setTokenType(sdk_1.TokenType.NonFungibleUnique)
            .setDecimals(0)
            .setInitialSupply(0)
            .setTreasuryAccountId(treasuryId)
            .setSupplyType(sdk_1.TokenSupplyType.Finite)
            .setMaxSupply(250)
            .setSupplyKey(supplyKey)
            .freezeWith(client);
        let nftCreateTxSign = await nftCreate.sign(treasuryKey);
        let nftCreateSubmit = await nftCreateTxSign.execute(client);
        let nftCreateRx = await nftCreateSubmit.getReceipt(client);
        let tokenId = nftCreateRx.tokenId;
        console.log(`- Created NFT with Token ID: ${tokenId} \n`);
    }
};
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "postNFT", null);
SmartContractController = __decorate([
    (0, common_1.Controller)('sc')
], SmartContractController);
exports.SmartContractController = SmartContractController;
//# sourceMappingURL=smartContract.controller.js.map