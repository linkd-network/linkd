import { Body, Controller, Post } from '@nestjs/common';
import { Ad } from 'src/model/ad.entity';
import { AdService } from '../services/ad/ad.service';

@Controller('ads')
export class AdsController {
    constructor(private adService: AdService){}
    @Post()
    postAd(@Body() payload: Partial<Ad>) {
        try {
            return this.adService.postAd(payload);
        } catch (error) {
            throw error
        }
    }
}
