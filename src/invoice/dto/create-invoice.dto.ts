import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { Double } from "typeorm";

/* eslint-disable prettier/prettier */
export class CreateInvoiceDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    userId: number;

    @IsNotEmpty()
    @IsPositive()
    totalPrice: Double;
}
