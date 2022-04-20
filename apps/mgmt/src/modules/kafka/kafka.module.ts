import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './services/kafka-consumer/kafka-consumer.service';
import { KafkaHelperService } from './services/kafka-helper/kafka-helper.service';
import { KafkaProducerService } from './services/kafka-producer/kafka-producer.service';

@Module({
    providers: [
        KafkaProducerService,
        KafkaHelperService,
        KafkaConsumerService
    ],
    exports: [
        KafkaProducerService,
        KafkaHelperService,
        KafkaConsumerService
    ]
})
export class KafkaModule { }
