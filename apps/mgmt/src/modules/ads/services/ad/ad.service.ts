import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from 'src/model/ad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdService {
    constructor(@InjectRepository(Ad) private readonly repo: Repository<Ad>) { }

    public postAd(payload: Partial<Ad>) {

    }

    private validateNewAd({ ad }: { ad: Partial<Ad> }) {
        if (!ad) {
            return new Error('No Ad provided');
        }
        if (ad.budget > 0) {
            return new Error('Budget minimum is 1');
        }

        if (!ad.model) {
            return new Error('No model selected');
        }

        if (!ad.content_type) {
            return new Error('Please select model type');
        }

        if (!ad.sampling_rate) {
            return new Error('Please select sampling rate');
        }

        ad.creation_date = new Date().getTime();


    }
}
