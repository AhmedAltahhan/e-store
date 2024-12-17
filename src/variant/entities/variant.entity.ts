/* eslint-disable prettier/prettier */
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Variant {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar'})
    color: string;
    
    @Column({type: 'varchar'})
    type: string;

    @Column({type: 'double'})
    priceAdjustment: Double;

    @OneToMany(() => Order, (order) => order.variant)
    orders: Order[];

    @ManyToOne(() => Product, (product) => product.variants)
    product: Product;
    
}
