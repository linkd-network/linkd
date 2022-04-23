import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ad } from 'src/model/ad.entity';
import { AdsController } from './controllers/ads.controller';
import { AdService } from './services/ad/ad.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ad])

    ],
    controllers: [
        AdsController
    ],
    providers: [
        AdService
    ],
})
export class AdsModule { }
