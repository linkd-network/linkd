/* eslint-disable prettier/prettier */
import { ContractId, TokenId, AccountId } from '@hashgraph/sdk';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostAdPayload } from 'src/app.models';
import { Ad } from 'src/model/ad.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { HederaAPIService } from '../../../../shared/services/hederaAPI.service';

@Injectable()
export class AdService {
    constructor(
        @InjectRepository(Ad) private readonly repo: Repository<Ad>,
        private hederaAPIService: HederaAPIService,
    ) { }

    public async getAdsForUI() {

        return await this.repo.find({ select: ['content', 'id', 'name', 'creationDate'] })

    }

    public async triggerEvent({ contractId, accountId }: { contractId: string, accountId: string }) {
        return await this.hederaAPIService.triggerPayment({ accountId: AccountId.fromString(accountId), contractId: ContractId.fromString(contractId) })
    }

    public async subscribeToAd({ id }: { id: string }) {
        const res = await this.repo.findOne({
            where: {
                id: id
            }
        })

        const { accountId, key, accountIdStr } = await this.hederaAPIService.createAccount();
        this.hederaAPIService.associateSmartContract({ accountKey: key, accountId: accountId, contractId: ContractId.fromString(res.contractId) })
        return {
            contractId: res.contractId,
            accountId: accountIdStr
        }
    }

    public async publishNewAd({ ad }: { ad: PostAdPayload }) {
        const { tokenId, tokenIdString } = await this.hederaAPIService.createFungibleToken({ initialTokenSupply: ad.totalBudget })

        const { contractId } = await this.hederaAPIService.publishSmartContract({
            amountPerEvent: ad.coinsPerEvent,
            tokenAddressSol: tokenId.toSolidityAddress(),
            tokenId: tokenId,
        })

        const migratedAd = new Ad()

        migratedAd.id = uuidv4();
        migratedAd.content = ad.content;
        migratedAd.contractId = contractId;
        migratedAd.creationDate = new Date();
        migratedAd.name = ad.name;
        migratedAd.tokenId = tokenIdString;

        await this.repo.insert(migratedAd)

    }

}
