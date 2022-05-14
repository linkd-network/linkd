/* eslint-disable prettier/prettier */
import { AdModel, ContentType, SamplingRate } from 'src/app.enums';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ad' })
export class Ad {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 300 })
    resourceType: string;

    @Column({ type: 'varchar', length: 300 })
    title: string;

    @Column({ type: 'varchar', length: 300 })
    contentURL: string;

    @Column({ type: 'int' })
    budget: number;

    @Column({ type: 'int' })
    costPerAction: number;

    @Column({ type: 'varchar', length: 300 })
    triggerType: string;

    @Column({ type: 'varchar', length: 300 })
    destinationURL: string;

    @Column({ type: 'varchar', length: 300 })
    contractId: string;

    @Column({ type: 'timestamptz' }) // Recommended
    creationDate: Date


}
