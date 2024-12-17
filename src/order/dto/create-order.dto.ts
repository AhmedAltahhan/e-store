import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { Double, IntegerType } from "typeorm";

/* eslint-disable prettier/prettier */
export class CreateOrderDto {
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    quantity: IntegerType;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    invoiceId: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    variantId: number;

    @IsNotEmpty()
    @IsPositive()
    price: Double;
}
