import { EachBatchPayload } from "kafkajs";
import { KafkaConsumerService } from "src/modules/kafka/services/kafka-consumer/kafka-consumer.service";
export declare class TrackerKafkaConsumerService {
    private readonly KafkaConsumer;
    constructor(KafkaConsumer: KafkaConsumerService);
    initConsumer(): void;
    batchHandler({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary, uncommittedOffsets, isRunning, isStale, }: EachBatchPayload): Promise<void>;
}
