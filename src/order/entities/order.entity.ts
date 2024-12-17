/* eslint-disable prettier/prettier */
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Variant } from "src/variant/entities/variant.entity";
import { Column, Double, Entity, IntegerType, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'int'})
    quantity: IntegerType;
    
    @Column({type: 'double'})
    price: Double;

    @ManyToOne(() => Invoice, (invoice) => invoice.orders)
    invoice: Invoice;

    @ManyToOne(() => Variant, (variant) => variant.orders)
    variant: Variant;
}
