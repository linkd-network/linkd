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
exports.TrackerService = void 0;
const common_1 = require("@nestjs/common");
const app_enums_1 = require("../../../../app.enums");
const kafka_producer_service_1 = require("../../../kafka/services/kafka-producer/kafka-producer.service");
const tracker_kafka_consumer_service_1 = require("../tracker-kafka-consumer/tracker-kafka-consumer.service");
let TrackerService = class TrackerService {
    constructor(kafkaProducer, trackerKafkaConsumerService) {
        this.kafkaProducer = kafkaProducer;
        this.trackerKafkaConsumerService = trackerKafkaConsumerService;
    }
    async postEvents({ events }) {
        await this.kafkaProducer.produce({
            record: {
                topic: app_enums_1.KafkaTopics.WebEvents,
                messages: events.map(event => ({ key: 'track-events', value: JSON.stringify(event) })),
            },
        });
    }
};
TrackerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_producer_service_1.KafkaProducerService,
        tracker_kafka_consumer_service_1.TrackerKafkaConsumerService])
], TrackerService);
exports.TrackerService = TrackerService;
//# sourceMappingURL=tracker.service.js.map