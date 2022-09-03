import { Ad } from 'src/model/ad.entity';
import { AdService } from '../services/ad/ad.service';
export declare class AdsController {
    private adService;
    constructor(adService: AdService);
    postAd(payload: Partial<Ad>): Promise<{
        id: string;
        content: string;
        budget: number;
        model: import("../../../app.enums").AdModel;
        contentType: import("../../../app.enums").ContentType;
        samplingRate: import("../../../app.enums").SamplingRate;
        creationDate: number;
        publisher: string;
    }>;
}
