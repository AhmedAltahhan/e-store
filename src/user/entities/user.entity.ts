/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, /* OneToMany ,*/ /*CreateDateColumn*/ } from 'typeorm';
// import { Invoice } from '../../invoice/entities/invoice.entity';
import { UserType } from 'src/utils/enums';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'varchar'})
    name: string;
  
    @Column({type: 'varchar', unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: UserType.CUSTOMER})
    type: UserType;

    @OneToMany(() => Invoice, (invoice) => invoice.user)
    invoices: Invoice[];
}
