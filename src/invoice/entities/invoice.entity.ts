/* eslint-disable prettier/prettier */
import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'double'})
    totalPrice: Double;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.invoices)
    user: User;

    @OneToMany(() => Order, (order) => order.invoice)
    orders: Order[];

    
}
