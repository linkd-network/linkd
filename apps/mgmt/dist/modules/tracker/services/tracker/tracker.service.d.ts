import { WebEvent } from '@shared/models';
import { KafkaProducerService } from 'src/modules/kafka/services/kafka-producer/kafka-producer.service';
import { TrackerKafkaConsumerService } from '../tracker-kafka-consumer/tracker-kafka-consumer.service';
export declare class TrackerService {
    private kafkaProducer;
    private trackerKafkaConsumerService;
    constructor(kafkaProducer: KafkaProducerService, trackerKafkaConsumerService: TrackerKafkaConsumerService);
    postEvents({ events }: {
        events: WebEvent[];
    }): Promise<void>;
}
