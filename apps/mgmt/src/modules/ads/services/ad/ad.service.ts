import { AccountsForDemo } from './../../../../model/accountForDemo.entity';
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
        @InjectRepository(AccountsForDemo) private readonly accountRepo: Repository<AccountsForDemo>,
        private hederaAPIService: HederaAPIService,
    ) { }

    public async getAdsForUI() {
        return await this.repo.find({ select: ['content', 'id', 'name', 'creationDate'] })
    }
    public async getContractState() {
        const contracts = await this.repo.find({ select: ['content', 'id', 'name', 'contractId', 'creationDate'] })
        const accounts = await this.accountRepo.find({});


        const { contractId } = contracts[contracts.length - 1];
        const { events } = await this.hederaAPIService.getContractDetails({ contractId: ContractId.fromString(contractId) });
        const { balance } = await this.hederaAPIService.getContractBalance({ contractId: ContractId.fromString(contractId) });
        const acountBalanceList = []
        for (const account of accounts) {

            const { balance } = await this.hederaAPIService.checkBalance({ accountId: AccountId.fromString(account.accountId) });
            console.log(balance);
            acountBalanceList.push({
                name: account.username,
                amount: balance
            })
        }



        return { events, contractBalnce: balance, accounts: acountBalanceList };
    }

    public async getAccountBalance() {
        return await this.repo.find({ select: ['content', 'id', 'name', 'creationDate'] })
    }


    public async triggerEvent({ contractId, accountId, eventType }: { contractId: string, accountId: string, eventType: string }) {
        return await this.hederaAPIService.triggerEvent({ accountId: AccountId.fromString(accountId), contractId: ContractId.fromString(contractId), eventType })
    }

    public async subscribeToAd({ id }: { id: string }) {
        const res = await this.repo.findOne({
            where: {
                id: id
            }
        })

        const { accountId, key, accountIdStr } = await this.hederaAPIService.createAccount();

        const account = new AccountsForDemo()


        account.id = uuidv4();
        account.accountId = accountIdStr;
        account.username = res.name;

        await this.accountRepo.insert(account);

        this.hederaAPIService.associateSmartContract({ accountKey: key, accountId: accountId, contractId: ContractId.fromString(res.contractId) })
        return {
            contractId: res.contractId,
            accountId: accountIdStr
        }
    }

    public async publishNewAd({ ad }: { ad: PostAdPayload }) {

        const { contractId } = await this.hederaAPIService.publishSmartContract({
            budget: ad.totalBudget,
            eventType: ad.eventType,
            amountPerEvent: ad.coinsPerEvent
        })

        const migratedAd = new Ad()


        migratedAd.id = uuidv4();
        migratedAd.content = ad.content;
        migratedAd.contractId = contractId;
        migratedAd.creationDate = new Date();
        migratedAd.name = ad.name;

        await this.repo.insert(migratedAd)

    }

}
