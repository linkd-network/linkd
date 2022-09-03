import { Injectable } from '@nestjs/common';
import { WebEvent } from '@shared/models';
import { KafkaTopics } from 'src/app.enums';
import { KafkaProducerService } from 'src/modules/kafka/services/kafka-producer/kafka-producer.service';
import { TrackerKafkaConsumerService } from '../tracker-kafka-consumer/tracker-kafka-consumer.service';

@Injectable()
export class TrackerService {
    constructor(
        private kafkaProducer: KafkaProducerService,
        private trackerKafkaConsumerService: TrackerKafkaConsumerService
    ) { }

    async postEvents({ events }: { events: WebEvent[] }) {

        await this.kafkaProducer.produce({
            record: {
                topic: KafkaTopics.WebEvents,
                messages: events.map(event => ({ key: 'track-events', value: JSON.stringify(event) })),
            },
        });
    }
}
