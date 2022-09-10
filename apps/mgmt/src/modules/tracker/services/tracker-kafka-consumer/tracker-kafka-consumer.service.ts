import { Injectable } from "@nestjs/common";
import { EachBatchPayload } from "kafkajs";
import { KafkaTopics } from "src/app.enums";
import { KafkaConsumerService } from "src/modules/kafka/services/kafka-consumer/kafka-consumer.service";

@Injectable()
export class TrackerKafkaConsumerService {
    constructor(private readonly KafkaConsumer: KafkaConsumerService) {
        this.initConsumer();
    }

    initConsumer() {
        console.log("init Tracker Consumer");

        this.KafkaConsumer.consume({
            config: {
                autoCommit: true,
                eachBatchAutoResolve: true,
                eachBatch: this.batchHandler,
            },
            topic: {
                topic: KafkaTopics.WebEvents,
                fromBeginning: false,
            },
        });
    }

    async batchHandler({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary, uncommittedOffsets, isRunning, isStale, }: EachBatchPayload) {
        console.log('New tracker batch Handling')

        for (const message of batch.messages) {
            console.log({
                topic: batch.topic,
                partition: batch.partition,
                highWatermark: batch.highWatermark,
                message: {
                    offset: message.offset,
                    key: message.key.toString(),
                    value: message.value.toString(),
                    headers: message.headers,
                },
            });

            resolveOffset(message.offset);
            await heartbeat();
        }
    }
}
