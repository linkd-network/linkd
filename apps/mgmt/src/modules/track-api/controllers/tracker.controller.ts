import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaTopic, TrackerEventType } from 'src/app.enums';
import { TrackerEvent } from 'src/app.models';
import { TrackingEvent } from 'src/model/trackEvent.entity';
import { KafkaProducerService } from 'src/modules/kafka/services/kafka-producer/kafka-producer.service';
import { Repository } from 'typeorm';
import { TrackingService } from '../services/tracking/tracking.service';

@Controller('tracker')
export class TrackerController {

    constructor(private trackingService: TrackingService) { }
    @Put()
    tackingEvent(@Body() payload: Partial<TrackingEvent>[]) {
        try {
            this.trackingService.addEvent({ events: payload })
        } catch (error) {

        }
    }

    // @Post('event')
    // async postEvent(payload) {


    //     let eventList: TrackerEvent[] = [
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.View,
    //             date: new Date().getTime() - 3
    //         },
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.View,
    //             date: new Date().getTime() - 2
    //         },
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.View,
    //             date: new Date().getTime() - 1
    //         },
    //         {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.Click,
    //             date: new Date().getTime() - 10
    //         }, {
    //             source: 'nike',
    //             id: 'some_nft_id',
    //             eventType: TrackerEventType.Click,
    //             date: new Date().getTime()
    //         }
    //     ]
    //     await this.producerService.produce({
    //         record: {
    //             topic: KafkaTopic.SCEvents,
    //             messages: eventList.map(x => {
    //                 return { value: JSON.stringify(x) }
    //             })
    //         }
    //     })

    //     return { success: true };
    // }
}
