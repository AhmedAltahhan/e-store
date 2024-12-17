/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Double } from 'typeorm';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsPositive()
    price?: Double;

    @IsOptional()
    @IsInt()
    @IsPositive()
    categoryId?: number;
}
