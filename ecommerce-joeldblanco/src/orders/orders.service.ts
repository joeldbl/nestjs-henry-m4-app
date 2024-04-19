import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.addOrder(createOrderDto);
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderRepository.getOrder(id);
  }

  // update(id: string, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} order`;
  // }
}
