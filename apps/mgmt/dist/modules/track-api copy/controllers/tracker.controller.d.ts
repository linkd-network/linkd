import { TrackingEvent } from 'src/model/trackEvent.entity';
import { TrackingService } from '../services/tracking/tracking.service';
export declare class TrackerController {
    private trackingService;
    constructor(trackingService: TrackingService);
    tackingEvent(payload: Partial<TrackingEvent>[]): void;
}
