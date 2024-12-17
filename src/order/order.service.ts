/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {
  }

  async create(createOrderDto: CreateOrderDto) {
    const data = await this.orderRepo.save(createOrderDto);
    return data;
  }

  findAll(page: number, perPage: number) {
    const data = this.orderRepo.find({
      skip: perPage * (page - 1),
      take: perPage,
    });
    return data;
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOneBy({id:id});
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({id:id});
    order.quantity = updateOrderDto.quantity ?? order.quantity;
    order.price = updateOrderDto.price ?? order.price;
    const data = await this.orderRepo.save(order);
    return data;
  }

  async remove(id: number) {
    await this.orderRepo.delete(id);
    return `This action removes a #${id} order`;
  }
}
