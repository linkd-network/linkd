import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn()
    accountId: string;

    @Column({ type: 'timestamp' })
    lastUpdatedAt: Date;

    @Column({ type: 'timestamp' })
    createdAt: Date;
}