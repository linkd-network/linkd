import { Ad } from 'src/model/ad.entity';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsController } from './controllers/ads.controller';
import { AdService } from './services/ad/ad.service';
import { HederaAPIService } from '../../shared/services/hederaAPI.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ad])

    ],
    controllers: [
        AdsController
    ],
    providers: [
        AdService,
        HederaAPIService
    ],
})
export class AdsModule { }
