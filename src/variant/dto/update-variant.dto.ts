/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVariantDto } from './create-variant.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Double } from 'typeorm';

export class UpdateVariantDto extends PartialType(CreateVariantDto) {
    @IsOptional()
    color?: string;

    @IsOptional()
    type?: string;

    @IsOptional()
    @IsPositive()
    priceAdjustment?: Double;

    @IsOptional()
    @IsInt()
    @IsPositive()
    productId?: number;
}
