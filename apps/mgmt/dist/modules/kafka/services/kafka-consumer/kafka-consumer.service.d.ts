import { OnApplicationShutdown } from '@nestjs/common';
import { ConsumerRunConfig, ConsumerSubscribeTopic } from 'kafkajs';
import { KafkaHelperService } from '../kafka-helper/kafka-helper.service';
export declare class KafkaConsumerService implements OnApplicationShutdown {
    private readonly kafkaHelperService;
    constructor(kafkaHelperService: KafkaHelperService);
    private readonly kafka;
    private readonly consumers;
    consume({ config, topic, }: {
        topic: ConsumerSubscribeTopic;
        config: ConsumerRunConfig;
    }): Promise<void>;
    onApplicationShutdown(): Promise<void>;
}
