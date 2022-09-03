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
exports.KafkaConsumerService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const kafka_helper_service_1 = require("../kafka-helper/kafka-helper.service");
let KafkaConsumerService = class KafkaConsumerService {
    constructor(kafkaHelperService) {
        this.kafkaHelperService = kafkaHelperService;
        this.kafka = new kafkajs_1.Kafka({
            brokers: this.kafkaHelperService.getBrokers(),
        });
        this.consumers = [];
    }
    async consume({ config, topic, }) {
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
};
KafkaConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_helper_service_1.KafkaHelperService])
], KafkaConsumerService);
exports.KafkaConsumerService = KafkaConsumerService;
//# sourceMappingURL=kafka-consumer.service.js.map