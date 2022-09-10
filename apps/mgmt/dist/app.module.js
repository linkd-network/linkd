"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const ads_module_1 = require("./modules/ads/ads.module");
const smartContract_module_1 = require("./modules/smartContract/smartContract.module");
const tracker_module_1 = require("./modules/tracker/tracker.module");
require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tracker_module_1.TrackerModule,
            ads_module_1.AdsModule,
            smartContract_module_1.SmartContractModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: DB_HOST,
                port: Number(DB_PORT),
                username: DB_USERNAME,
                password: DB_PASSWORD,
                database: DB,
                entities: [__dirname + '/../**/*.entity.js'],
                ssl: false,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map