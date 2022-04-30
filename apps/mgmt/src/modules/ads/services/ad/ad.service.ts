import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from 'src/model/ad.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdService {
    constructor(@InjectRepository(Ad) private readonly repo: Repository<Ad>) { }

    public async postAd(payload: Partial<Ad>) {

        this.validateNewAd({ ad: payload })
        let ad: Ad = this.addMissingFieldToAd({ ad: payload });
        try {
            console.log('Inserting ad into DB', ad);
            await this.repo.insert(ad);

            this.startCampaign({ ad });
            return { ...ad }
        } catch (error) {
            console.error(error)
            throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    startCampaign({ ad }: { ad: Ad }) {

    }

    private addMissingFieldToAd({ ad }: { ad: Partial<Ad> }): Ad {

        ad.creationDate = new Date().getTime();

        ad.id = uuidv4();
        return <Ad>ad;
    }

    private validateNewAd({ ad }: { ad: Partial<Ad> }) {
        if (!ad) {
            throw new HttpException(`No Ad provided`, HttpStatus.BAD_REQUEST);
        }

        this.checkNotNullInFields({ obj: ad, fields: ['budget', 'model', 'content_type', 'sampling_rate'] })

        if (ad.budget <= 0) {
            throw new HttpException(`Budget minimum is 1`, HttpStatus.BAD_REQUEST);
        }

    }


    checkNotNullInFields({ obj, fields }: { obj: Object, fields: string[] }) {
        for (const field of fields) {
            if (!obj[field] && obj[field] !== 0) {
                throw new HttpException(`Missing field ${field}`, HttpStatus.BAD_REQUEST);
            }
        }
    }
}
