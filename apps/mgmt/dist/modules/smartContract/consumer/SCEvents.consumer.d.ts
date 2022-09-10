import { OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from 'src/modules/kafka/services/kafka-consumer/kafka-consumer.service';
export declare class SCEventsConsumer implements OnModuleInit {
    private readonly KafkaConsumer;
    constructor(KafkaConsumer: KafkaConsumerService);
    onModuleInit(): void;
}
