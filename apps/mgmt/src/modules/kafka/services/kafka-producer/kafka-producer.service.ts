import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { KafkaHelperService } from '../kafka-helper/kafka-helper.service';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {
    constructor(private readonly kafkaHelperService: KafkaHelperService) {}
    private readonly kafka = new Kafka({
        brokers: this.kafkaHelperService.getBrokers()
    })
    private readonly producer: Producer = this.kafka.producer();

    async onModuleInit() {
        await this.producer.connect();
    }

    async produce({ record }: { record: ProducerRecord }) {
        await this.producer.send(record);
    }

    async onApplicationShutdown() {
        this.producer.disconnect();
    }
}
