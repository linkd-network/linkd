import { Ad } from 'src/model/ad.entity';
import { Repository } from 'typeorm';
export declare class AdService {
    private readonly repo;
    constructor(repo: Repository<Ad>);
    postAd(payload: Partial<Ad>): Promise<{
        id: string;
        content: string;
        budget: number;
        model: import("../../../../app.enums").AdModel;
        contentType: import("../../../../app.enums").ContentType;
        samplingRate: import("../../../../app.enums").SamplingRate;
        creationDate: number;
        publisher: string;
    }>;
    startCampaign({ ad }: {
        ad: Ad;
    }): void;
    private addMissingFieldToAd;
    private validateNewAd;
    checkNotNullInFields({ obj, fields }: {
        obj: Object;
        fields: string[];
    }): void;
}
