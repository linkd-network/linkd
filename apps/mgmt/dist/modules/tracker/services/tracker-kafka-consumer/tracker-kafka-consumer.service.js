"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerKafkaConsumerService = void 0;
const common_1 = require("@nestjs/common");
const app_enums_1 = require("../../../../app.enums");
const kafka_consumer_service_1 = require("../../../kafka/services/kafka-consumer/kafka-consumer.service");
let TrackerKafkaConsumerService = class TrackerKafkaConsumerService {
    constructor(KafkaConsumer) {
        this.KafkaConsumer = KafkaConsumer;
        this.initConsumer();
    }
    initConsumer() {
        console.log("initConsumer !!!!!!!!!!!!!!!!!!!!!!!!");
        this.KafkaConsumer.consume({
            config: {
                autoCommit: true,
                eachBatchAutoResolve: true,
                eachBatch: this.batchHandler,
            },
            topic: {
                topic: app_enums_1.KafkaTopics.WebEvents,
                fromBeginning: false,
            },
        });
    }
    async batchHandler({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary, uncommittedOffsets, isRunning, isStale, }) {
        console.log('batchHandler');
        console.log('------------------------------------------------------------');
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
};
TrackerKafkaConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_consumer_service_1.KafkaConsumerService])
], TrackerKafkaConsumerService);
exports.TrackerKafkaConsumerService = TrackerKafkaConsumerService;
//# sourceMappingURL=tracker-kafka-consumer.service.js.map