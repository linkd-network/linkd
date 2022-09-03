"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = void 0;
const common_1 = require("@nestjs/common");
const kafka_consumer_service_1 = require("./services/kafka-consumer/kafka-consumer.service");
const kafka_helper_service_1 = require("./services/kafka-helper/kafka-helper.service");
const kafka_producer_service_1 = require("./services/kafka-producer/kafka-producer.service");
let KafkaModule = class KafkaModule {
};
KafkaModule = __decorate([
    (0, common_1.Module)({
        providers: [kafka_producer_service_1.KafkaProducerService, kafka_helper_service_1.KafkaHelperService, kafka_consumer_service_1.KafkaConsumerService],
        exports: [kafka_producer_service_1.KafkaProducerService, kafka_helper_service_1.KafkaHelperService, kafka_consumer_service_1.KafkaConsumerService],
    })
], KafkaModule);
exports.KafkaModule = KafkaModule;
//# sourceMappingURL=kafka.module.js.map