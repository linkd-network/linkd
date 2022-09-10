import { TrackerService } from '../../services/tracker/tracker.service';
import { WebEvent } from '@shared/models';
export declare class TrackerController {
    private trackerService;
    constructor(trackerService: TrackerService);
    postData(body: {
        events: WebEvent[];
    }): Promise<void>;
}
