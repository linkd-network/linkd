import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from 'src/model/ad.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdService {
    constructor(@InjectRepository(Ad) private readonly repo: Repository<Ad>) { }

    public postAd(payload: Partial<Ad>) {

        try {
            this.validateNewAd({ ad: payload })
            let ad: Ad = this.addMissingFieldToAd({ ad: payload });
            this.repo.insert(ad);

        } catch (error) {
            console.log(error);
        }
    }

    private addMissingFieldToAd({ ad }: { ad: Partial<Ad> }): Ad {
        ad.creation_date = new Date().getTime();
        ad.id = uuidv4();
        return <Ad>ad;
    }

    private validateNewAd({ ad }: { ad: Partial<Ad> }) {
        if (!ad) {
            return new Error('No Ad provided');
        }

        this.checkNotNullInFields({ obj: ad, fields: ['budget', 'model', 'content_type', 'sampling_rate'] })
        
        if (ad.budget > 0) {
            return new Error('Budget minimum is 1');
        }

    }


    checkNotNullInFields({ obj, fields }: { obj: Object, fields: string[] }) {
        for (const field of fields) {
            if (!obj[field]) {
                return new Error(`Missing field ${field}`);
            }
        }
    }
}
