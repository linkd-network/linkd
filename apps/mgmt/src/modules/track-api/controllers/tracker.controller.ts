import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaTopic, TrackerEventType } from 'src/app.enums';
import { TrackerEvent } from 'src/app.models';
import { Note } from 'src/model/notes.entity';
import { KafkaProducerService } from 'src/modules/kafka/services/kafka-producer/kafka-producer.service';
import { Repository } from 'typeorm';

@Controller('tracker')
export class TrackerController {

    constructor(@InjectRepository(Note) private readonly repo: Repository<Note>) { }

    @Get()
    public async getAll() {
        return await this.repo.find();
    }

    @Post()
    public async post() {
        return await this.repo.insert({id:'2',note:'asodm'});
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
