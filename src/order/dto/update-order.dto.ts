/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Double, IntegerType } from 'typeorm';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsInt()
    @IsPositive()
    @IsOptional()
    quantity?: IntegerType;

    @IsOptional()
    @IsInt()
    @IsPositive()
    invoiceId?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    variantId?: number;

    @IsOptional()
    @IsPositive()
    price?: Double;
}
