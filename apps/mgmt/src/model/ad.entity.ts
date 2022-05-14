/* eslint-disable prettier/prettier */
import { AdModel, ContentType, SamplingRate } from 'src/app.enums';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ad' })
export class Ad {
   
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 300 })
    name: string;

    @Column({ type: 'varchar', length: 300 })
    contractId: string;

    @Column({ type: 'varchar', length: 300 })
    content: string;

    @Column({ type: 'timestamptz' }) // Recommended
    creationDate:Date


}