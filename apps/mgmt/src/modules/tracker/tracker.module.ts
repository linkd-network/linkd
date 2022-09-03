import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import { TrackerController } from './controllers/tracker/tracker.controller';
import { TrackerKafkaConsumerService } from './services/tracker-kafka-consumer/tracker-kafka-consumer.service';
import { TrackerService } from './services/tracker/tracker.service';

@Module({
    imports: [KafkaModule],
    controllers: [TrackerController],
    providers: [
        TrackerKafkaConsumerService,
        TrackerService
    ],
})
export class TrackerModule { }
