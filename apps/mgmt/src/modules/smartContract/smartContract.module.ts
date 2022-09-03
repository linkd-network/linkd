import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEvent } from 'src/model/trackEvent.entity';
import { SmartContractController } from './controllers/smartContract.controller';

@Module({
    imports: [
        // TypeOrmModule.forFeature([TrackingEvent])
    ],
    controllers: [
        SmartContractController
    ],
    providers: [
    ],
})
export class SmartContractModule { }
