/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'account' })
export class AccountsForDemo {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 300 })
    accountId: string;

    @Column({ type: 'varchar', length: 300 })
    username: string;

}