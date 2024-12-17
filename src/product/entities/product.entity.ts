/* eslint-disable prettier/prettier */
import { Category } from "src/category/entities/category.entity";
import { Variant } from "src/variant/entities/variant.entity";
import { Column, CreateDateColumn, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
     @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar'})
    name: string;
    
    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'double'})
    price: Double;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date

    @OneToMany(() => Variant, (variant) => variant.product)
    variants: Variant[];

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}
