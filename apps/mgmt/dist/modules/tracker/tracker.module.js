"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerModule = void 0;
const common_1 = require("@nestjs/common");
const kafka_module_1 = require("../kafka/kafka.module");
const tracker_controller_1 = require("./controllers/tracker/tracker.controller");
const tracker_kafka_consumer_service_1 = require("./services/tracker-kafka-consumer/tracker-kafka-consumer.service");
const tracker_service_1 = require("./services/tracker/tracker.service");
let TrackerModule = class TrackerModule {
};
TrackerModule = __decorate([
    (0, common_1.Module)({
        imports: [kafka_module_1.KafkaModule],
        controllers: [tracker_controller_1.TrackerController],
        providers: [
            tracker_kafka_consumer_service_1.TrackerKafkaConsumerService,
            tracker_service_1.TrackerService
        ],
    })
], TrackerModule);
exports.TrackerModule = TrackerModule;
//# sourceMappingURL=tracker.module.js.map