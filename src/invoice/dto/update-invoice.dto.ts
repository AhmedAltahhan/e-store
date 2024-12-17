/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Double } from 'typeorm';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
        @IsOptional()
        @IsInt()
        @IsPositive()
        userId?: number;
    
        @IsOptional()
        @IsPositive()
        totalPrice?: Double;
}
