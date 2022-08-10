import { EntityType } from 'src/enums/drt.enums';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'subscriptions' })
@Unique("UNIQ_SUB", ["subscriberType", "userId", "keyName"])
export class Subscription {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: EntityType,
    })
    subscriberType: EntityType;

    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.accountId)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    keyName: string;

    @Column({ name: 'metadata' })
    customMetadata: string;

    @Column({ name: 'accessKeyNFT' })
    accessKeyNFT: string;

    @Column({ type: 'timestamp' })
    lastUpdatedAt: Date;

    @Column({ type: 'timestamp' })
    createdAt: Date;
}