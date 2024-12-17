/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { Repository } from 'typeorm';
import { Variant } from './entities/variant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VariantService {
  constructor(@InjectRepository(Variant) private variantRepo: Repository<Variant>) {
  }
  async create(createVariantDto: CreateVariantDto) {
    const data = await this.variantRepo.save(createVariantDto);
    return data;
  }

  findAll(page: number, perPage: number) {
    const data = this.variantRepo.find({
      skip: perPage * (page - 1),
      take: perPage,
    });
    return data;
  }

  async findOne(id: number) {
    const user = await this.variantRepo.findOneBy({id:id});
    return user;
  }

  async update(id: number, updateVariantDto: UpdateVariantDto) {
    const variant = await this.variantRepo.findOneBy({id:id});
    variant.color = updateVariantDto.color ?? variant.color;
    variant.type = updateVariantDto.type ?? variant.type;
    variant.priceAdjustment = updateVariantDto.priceAdjustment ?? variant.priceAdjustment;
    const data = await this.variantRepo.save(variant);
    return data;
  }

  async remove(id: number) {
    await this.variantRepo.delete(id);
    return `This action removes a #${id} variant`;
  }
}
