import { Body, Controller, Post } from '@nestjs/common';
import { TrackerService } from '../../services/tracker/tracker.service';
import { WebEvent } from '@shared/models'
    ;
@Controller('tracker')
export class TrackerController {
    constructor(private trackerService: TrackerService) { }
    @Post()
    async postData(@Body() body: { events: WebEvent[] }) {
        await this.trackerService.postEvents(body);
        console.log(body);
    }
}
