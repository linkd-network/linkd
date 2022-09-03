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
exports.KafkaProducerService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const app_enums_1 = require("../../../../app.enums");
const kafka_helper_service_1 = require("../kafka-helper/kafka-helper.service");
let KafkaProducerService = class KafkaProducerService {
    constructor(kafkaHelperService) {
        this.kafkaHelperService = kafkaHelperService;
        this.kafka = new kafkajs_1.Kafka({
            clientId: 'mgmt',
            brokers: this.kafkaHelperService.getBrokers(),
        });
        this.producer = this.kafka.producer();
    }
    async initKafkaTopics() {
        const admin = this.kafka.admin();
        const topics = await admin.listTopics();
        const listOfTopicsToInit = [app_enums_1.KafkaTopics.WebEvents].filter((topic) => !topics.includes(topic));
        if (listOfTopicsToInit.length === 0)
            return;
        await admin.createTopics({
            topics: listOfTopicsToInit.map((topic) => ({ topic })),
        });
    }
    async onModuleInit() {
        await this.producer.connect();
        await this.initKafkaTopics();
    }
    async produce({ record }) {
        await this.producer.send(record);
    }
    async onApplicationShutdown() {
        this.producer.disconnect();
    }
};
KafkaProducerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_helper_service_1.KafkaHelperService])
], KafkaProducerService);
exports.KafkaProducerService = KafkaProducerService;
//# sourceMappingURL=kafka-producer.service.js.map