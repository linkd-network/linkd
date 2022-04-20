import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, Kafka } from 'kafkajs';
import { KafkaHelperService } from '../kafka-helper/kafka-helper.service';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
    constructor(private readonly kafkaHelperService: KafkaHelperService) { }

    private readonly kafka = new Kafka({
        brokers: this.kafkaHelperService.getBrokers()
    })
    private readonly consumers: Consumer[] = [];


    async consume({ config, topic }: { topic: ConsumerSubscribeTopic, config: ConsumerRunConfig }) {
        
        const consumer = this.kafka.consumer({ groupId: 'mgmt' });
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        console.log(this.consumers);
        
        for (const consumer of this.consumers) {
            consumer.disconnect();
        }
    }
}
