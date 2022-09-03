import { AdModel, ContentType, SamplingRate } from 'src/app.enums';
export declare class Ad {
    id: string;
    content: string;
    budget: number;
    model: AdModel;
    contentType: ContentType;
    samplingRate: SamplingRate;
    creationDate: number;
    publisher: string;
}
