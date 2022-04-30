import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEvent } from 'src/model/trackEvent.entity';
import { SCEventsConsumer } from './consumer/SCEvents.consumer';
import { TrackerController } from './controllers/tracker.controller';
import { TrackingService } from './services/tracking/tracking.service';

@Module({
    imports: [
        // KafkaModule,
        TypeOrmModule.forFeature([TrackingEvent])
    ],
    controllers: [
        TrackerController
    ],
    providers: [
        TrackingService
        // SCEventsConsumer
    ],
})
export class TrackApiModule { }
