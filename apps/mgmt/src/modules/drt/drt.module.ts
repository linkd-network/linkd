import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'src/model/dataSubscription.entity';
import { HederaAPIService } from 'src/shared/services/hederaAPI.service';
import { IpfsAPIService } from 'src/shared/services/Ipfs.API.service';
import { UserModule } from '../users/users.module';
import { DrtController } from './controllers/drt/drt.controller';
import { SubscriptionService } from './services/subscription.service';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([Subscription]),
    ],
    controllers: [
        DrtController
    ],
    providers: [
        SubscriptionService,
        HederaAPIService,
        IpfsAPIService,
    ],
})
export class DrtModule { }
