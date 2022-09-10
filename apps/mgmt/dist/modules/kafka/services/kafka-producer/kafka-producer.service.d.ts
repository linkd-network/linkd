import { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ProducerRecord } from 'kafkajs';
import { KafkaHelperService } from '../kafka-helper/kafka-helper.service';
export declare class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {
    private readonly kafkaHelperService;
    private readonly kafka;
    private readonly producer;
    constructor(kafkaHelperService: KafkaHelperService);
    private initKafkaTopics;
    onModuleInit(): Promise<void>;
    produce({ record }: {
        record: ProducerRecord;
    }): Promise<void>;
    onApplicationShutdown(): Promise<void>;
}
