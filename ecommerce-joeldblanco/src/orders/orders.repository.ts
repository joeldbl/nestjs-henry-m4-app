import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { MoreThan, Repository } from 'typeorm';
import { OrderDetails } from 'src/order_details/entities/order_details.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User not found');

    const order = this.ordersRepository.create({
      user_id: user,
      date: new Date(),
    });
    const savedOrder = await this.ordersRepository.save(order);

    let dbProducts: Product[] = await Promise.all(
      products.map(async (product) => {
        const foundProduct = await this.productsRepository.findOne({
          where: {
            id: product.id,
            stock: MoreThan(0),
          },
        });

        if (!foundProduct) throw new NotFoundException();

        foundProduct.stock -= 1;
        const savedProduct = await this.productsRepository.save(foundProduct);

        return savedProduct;
      }),
    );

    const price: number = dbProducts.reduce(
      (acc: number, product: Product) => Number(acc) + Number(product.price),
      0,
    );

    const orderDetail = this.orderDetailsRepository.create({
      price,
      order_id: savedOrder,
      products: dbProducts,
    });

    const savedOrderDetail =
      await this.orderDetailsRepository.save(orderDetail);

    return savedOrderDetail;
  }
}
