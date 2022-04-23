import { AdModel, ContentType, SamplingRate } from 'src/app.enums';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ad' })
export class Ad {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 300 })
    content: string;

    @Column({ type: 'int' })
    budget: number

    @Column({ type: 'enum', enum: AdModel, default: AdModel.CPM })
    model: AdModel

    @Column({ type: 'enum', enum: ContentType })
    content_type: ContentType

    @Column({ type: 'enum', enum: SamplingRate, default: SamplingRate.Day })
    sampling_rate: SamplingRate

    @Column({ type: 'timestamp' }) // Not recommended
    creation_date: number;

    @Column({ type: 'varchar', length: 300 })
    publisher: string;
}