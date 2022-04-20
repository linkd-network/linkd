import { Entity, Column } from 'typeorm';

@Entity({ name: 'notes' })
export class Note {

    @Column({ type: 'int', primary: true })
    id: string;

    @Column({ type: 'varchar', length: 300 })
    note: string
}