import { TrackingEvent } from 'src/model/trackEvent.entity';
import { Repository } from 'typeorm';
export declare class TrackingService {
    private readonly repo;
    constructor(repo: Repository<TrackingEvent>);
    addEvent({ events }: {
        events: Partial<TrackingEvent>[];
    }): void;
    postToSmartContract({ events }: {
        events: TrackingEvent[];
    }): void;
}
