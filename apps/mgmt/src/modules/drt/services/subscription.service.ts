import { TokenId } from "@hashgraph/sdk";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDRTSubscriptionPayload, DRTSubscriptionViewPayload } from "src/app.models";
import { Subscription } from "src/model/dataSubscription.entity";
import { UserService } from "src/modules/users/services/users.service";
import { HederaAPIService } from "src/shared/services/hederaAPI.service";
import { IpfsAPIService } from "src/shared/services/Ipfs.API.service";
import { Repository } from "typeorm";

const DRT_TOKEN_ID = TokenId.fromString(process.env.DRT_TOKEN_ID || '0.0.47865323');

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
        private userService: UserService,
        private hederaAPIService: HederaAPIService,
        private ipfsAPIService: IpfsAPIService,
    ) { }
    
    public async upsertSubscription(subData: CreateDRTSubscriptionPayload): Promise<DRTSubscriptionViewPayload> {
        // create or find user
        const user = await this.userService.createUser({ accountId: subData.userAccountId });
        // check if there is already a subscription
        let subscription = await this.subscriptionRepository.findOne({ where: [ { subscriberType: subData.subscriberType, userId: user.accountId, keyName: subData.name } ] });

        // if not
        if (subscription == null) {
            const currentDateTime = new Date();
            //const hsNFT = await this.hederaAPIService.createNFT({tokenName: 'DataResourceToken', tokenSymbol: 'DRT', maxSupply: 100000});
            //console.log(`DRT NFT type: `, hsNFT);
            // Upload NFT metadata to IPFS
            const metadata = JSON.stringify({
                title: `${subData.userAccountId}DRT`,
                type: 'object',
                name: `${subData.userAccountId}DRT`,
                description: `${subData.subscriberType} DRT`,
                image: "https://ipfs.io/ipfs/QmQM1LDA9DgvaYPjuABCz9AoYF7Qc2gBeP6eCMdCmGoWrb",
                properties: {
                    date: currentDateTime,
                    accountId: subData.userAccountId,
                    originalMetadata: subData.customMetadata,
                }
            });
            const { cid } = await this.ipfsAPIService.save(metadata);
            // mint DRT NFT
            const mintedNFT = await this.hederaAPIService.mintNFT({ tokenId: DRT_TOKEN_ID, metadata: [Buffer.from(cid)] })
            // associate account with NFT - skipping, assuming that account can receive arbitrary NFTs
            // persist subscription
            subscription = new Subscription();
            subscription.userId = subData.userAccountId;
            subscription.user = user;
            subscription.subscriberType = subData.subscriberType;
            subscription.keyName = subData.name;
            subscription.customMetadata = JSON.stringify(subData.customMetadata);
            subscription.accessKeyNFT = mintedNFT.nftId.toString();
            subscription.createdAt = currentDateTime;
            subscription.lastUpdatedAt = currentDateTime;

            subscription = await this.subscriptionRepository.save(subscription);

            // transfer NFT
            const { status } = await this.hederaAPIService.transferNFT({ nftId: mintedNFT.nftId, destinationAccountId: subData.userAccountId });
            console.log(`NFT transfer status: ${status}`);
        }

        return {
            id: subscription.id,
            name: subscription.keyName,
            customMetadata: JSON.parse(subscription.customMetadata),
            user: user,
            accessKeyNFT: subscription.accessKeyNFT,
            lastUpdatedAt: subscription.lastUpdatedAt,
            createdAt: subscription.createdAt
        }
    }
}