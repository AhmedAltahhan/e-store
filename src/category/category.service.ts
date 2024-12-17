/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable() 
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>,) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryRepo.save(createCategoryDto);
    return data;
  }

  findAll(page: number, perPage: number) {
    const data = this.categoryRepo.find({
      skip: perPage * (page - 1),
      take: perPage,
    });
    return data;
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({id:id});
    return category;
  }

  async update(id: number, updateUserDto: UpdateCategoryDto) {
      const category = await this.categoryRepo.findOneBy({id:id});
      category.name = updateUserDto.name ?? category.name;
      const data = await this.categoryRepo.save(category);
      return data;
    }

  async remove(id: number) {
    await this.categoryRepo.delete(id);
    return `This action removes a #${id} category`;
  }
}
