import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { KafkaTopics } from 'src/app.enums';
import { KafkaHelperService } from '../kafka-helper/kafka-helper.service';

@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  constructor(private readonly kafkaHelperService: KafkaHelperService) {
    this.kafka = new Kafka({
      clientId: 'mgmt',
      brokers: this.kafkaHelperService.getBrokers(),
    });
    this.producer = this.kafka.producer();
  }

  private async initKafkaTopics() {
    const admin = this.kafka.admin();
    const topics = await admin.listTopics();
    const listOfTopicsToInit = [KafkaTopics.WebEvents].filter(
      (topic: KafkaTopics) => !topics.includes(topic),
    );
    if (listOfTopicsToInit.length === 0) return;

    await admin.createTopics({
      topics: listOfTopicsToInit.map((topic) => ({ topic })),
    });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.initKafkaTopics();
  }

  async produce({ record }: { record: ProducerRecord }) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    this.producer.disconnect();
  }
}
