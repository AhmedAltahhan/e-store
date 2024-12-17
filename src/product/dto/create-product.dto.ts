import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { Double } from "typeorm";

/* eslint-disable prettier/prettier */
export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsPositive()
    price: Double;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    categoryId: number;
}
