import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { Double } from "typeorm";

/* eslint-disable prettier/prettier */
export class CreateVariantDto {
    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @IsPositive()
    priceAdjustment: Double;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    productId: number;
}
