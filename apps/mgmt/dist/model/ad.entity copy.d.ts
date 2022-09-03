import { AdModel, ContentType, SamplingRate } from 'src/app.enums';
export declare class Ad {
    id: string;
    content: string;
    budget: number;
    model: AdModel;
    content_type: ContentType;
    sampling_rate: SamplingRate;
    creation_date: number;
    publisher: string;
}
