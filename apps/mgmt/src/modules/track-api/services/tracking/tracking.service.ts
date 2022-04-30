import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackingEvent } from 'src/model/trackEvent.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class TrackingService {

    constructor(@InjectRepository(TrackingEvent) private readonly repo: Repository<TrackingEvent>) { }


    addEvent({ events }: { events: Partial<TrackingEvent>[] }) {
        
        events = events.map(x => ({ ...x, id: uuidv4() }))

        this.postToSmartContract({ events: events as TrackingEvent[] });
        this.repo.insert(events)
    }



    postToSmartContract({ events }: { events: TrackingEvent[] }) {
        // Get contract 

        // post event
    }

}
