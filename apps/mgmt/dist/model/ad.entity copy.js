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
exports.Ad = void 0;
const app_enums_1 = require("../app.enums");
const typeorm_1 = require("typeorm");
let Ad = class Ad {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Ad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], Ad.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Ad.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: app_enums_1.AdModel, default: app_enums_1.AdModel.CPM }),
    __metadata("design:type", Number)
], Ad.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: app_enums_1.ContentType }),
    __metadata("design:type", Number)
], Ad.prototype, "content_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: app_enums_1.SamplingRate, default: app_enums_1.SamplingRate.Day }),
    __metadata("design:type", Number)
], Ad.prototype, "sampling_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Number)
], Ad.prototype, "creation_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], Ad.prototype, "publisher", void 0);
Ad = __decorate([
    (0, typeorm_1.Entity)({ name: 'ad' })
], Ad);
exports.Ad = Ad;
//# sourceMappingURL=ad.entity%20copy.js.map