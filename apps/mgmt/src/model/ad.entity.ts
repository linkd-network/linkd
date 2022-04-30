import { AdModel, ContentType, SamplingRate } from 'src/app.enums';
import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ad' })
export class Ad {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 300 })
    content: string;

    @Column({ type: 'int' })
    budget: number

    @Column({ type: 'enum', enum: AdModel, default: AdModel.CPM })
    model: AdModel

    @Column({ type: 'enum', enum: ContentType })
    contentType: ContentType

    @Column({ type: 'enum', enum: SamplingRate, default: SamplingRate.Day })
    samplingRate: SamplingRate

    @Column({ type: 'timestamp' }) // Not recommended
    creationDate: number;

    @Column({ type: 'varchar', length: 300 })
    publisher: string;
}