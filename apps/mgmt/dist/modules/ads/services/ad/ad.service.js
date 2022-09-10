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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ad_entity_1 = require("../../../../model/ad.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
let AdService = class AdService {
    constructor(repo) {
        this.repo = repo;
    }
    async postAd(payload) {
        this.validateNewAd({ ad: payload });
        let ad = this.addMissingFieldToAd({ ad: payload });
        try {
            console.log('Inserting ad into DB', ad);
            await this.repo.insert(ad);
            this.startCampaign({ ad });
            return Object.assign({}, ad);
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException(`Something went wrong`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    startCampaign({ ad }) {
    }
    addMissingFieldToAd({ ad }) {
        ad.creationDate = new Date().getTime();
        ad.id = (0, uuid_1.v4)();
        return ad;
    }
    validateNewAd({ ad }) {
        if (!ad) {
            throw new common_1.HttpException(`No Ad provided`, common_1.HttpStatus.BAD_REQUEST);
        }
        this.checkNotNullInFields({ obj: ad, fields: ['budget', 'model', 'content_type', 'sampling_rate'] });
        if (ad.budget <= 0) {
            throw new common_1.HttpException(`Budget minimum is 1`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    checkNotNullInFields({ obj, fields }) {
        for (const field of fields) {
            if (!obj[field] && obj[field] !== 0) {
                throw new common_1.HttpException(`Missing field ${field}`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
};
AdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ad_entity_1.Ad)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdService);
exports.AdService = AdService;
//# sourceMappingURL=ad.service.js.map