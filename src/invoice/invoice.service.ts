/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
    constructor(@InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>) {
    }
  async create(createInvoiceDto: CreateInvoiceDto) {
    const data = await this.invoiceRepo.save(createInvoiceDto);
    return data;
  }
     
  findAll(page: number, perPage: number) {
    const data = this.invoiceRepo.find({
      skip: perPage * (page - 1),
      take: perPage,
    });
    return data;
  }

  async findOne(id: number) {
    const invoice = await this.invoiceRepo.findOneBy({id:id});
    return invoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoiceRepo.findOneBy({id:id});
    invoice.totalPrice = updateInvoiceDto.totalPrice ?? invoice.totalPrice;
    const data = await this.invoiceRepo.save(invoice);
    return data;
  }

  async remove(id: number) {
    await this.invoiceRepo.delete(id);
    return `This action removes a #${id} invoice`;
  }
  
}
