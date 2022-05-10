/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostAdPayload } from 'src/app.models';
import { Ad } from 'src/model/ad.entity';
import { AdService } from '../services/ad/ad.service';

@Controller('ads')
export class AdsController {
    constructor(private adService: AdService) { }

    @Post('publish')
    async publishAd(@Body() payload: PostAdPayload) {
        await this.adService.publishNewAd({ ad: payload });
        return true;
    }

    @Post('subscribe')
    async subscribeToAd(@Body() { id }: { id: string }) {
        return await this.adService.subscribeToAd({ id });
    }

    @Post('triggerEvent')
    async triggerEvent(@Body() { contractId, accountId }: { contractId: string, accountId: string }) {
        return await this.adService.triggerEvent({ contractId, accountId });
    }

    @Get()
    async getAllAds() {
        return this.adService.getAdsForUI();
    }
}
