import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/model/notes.entity';
import { SCEventsConsumer } from './consumer/SCEvents.consumer';
import { TrackerController } from './controllers/tracker.controller';

@Module({
    imports: [
        // KafkaModule,
        TypeOrmModule.forFeature([Note])
    ],
    controllers: [
        TrackerController
    ],
    providers: [
        // SCEventsConsumer
    ],
})
export class TrackApiModule { }
