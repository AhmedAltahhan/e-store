/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {
  }
  async create(createProductDto: CreateProductDto) {
    const data = await this.productRepo.save(createProductDto);
    return data;
  }

  findAll(page: number, perPage: number) {
    const data = this.productRepo.find({
      skip: perPage * (page - 1),
      take: perPage,
    });
    return data;
  }

  async findOne(id: number) {
    const user = await this.productRepo.findOneBy({id:id});
    return user;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const user = await this.productRepo.findOneBy({id:id});
    user.name = updateProductDto.name ?? user.name;
    user.description = updateProductDto.description ?? user.description;
    user.price = updateProductDto.price ?? user.price;
    const data = await this.productRepo.save(user);
    return data;
  }

  async remove(id: number) {
    await this.productRepo.delete(id);
    return `This action removes a #${id} product`;
  }
}
