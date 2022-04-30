import { AdModel, ContentType, SamplingRate } from 'src/app.enums';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'trackingEvent' })
export class TrackingEvent {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 300 })
    publisherId: string;

    @Column({ type: 'enum', enum: AdModel })
    eventModel: AdModel

    @Column({ type: 'timestamp' }) // Not recommended
    eventDate: number;

    @Column({ type: 'varchar', length: 300 })
    adId: string;
}