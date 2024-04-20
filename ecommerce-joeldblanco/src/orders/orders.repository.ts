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

  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Destructure the userId and products from the createOrderDto
    const { userId, products } = createOrderDto;

    // Find the user by the userId
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Throw a NotFoundException if the user is not found
    if (!user) throw new NotFoundException('User not found');

    // Create an order with the user and the current date
    const order = this.ordersRepository.create({
      user,
      date: new Date(),
    });
    const savedOrder = await this.ordersRepository.save(order);

    // Create an array of products with the products from the createOrderDto
    let dbProducts: Product[] = await Promise.all(
      products.map(async (product) => {
        const foundProduct = await this.productsRepository.findOne({
          where: {
            id: product.id,
            stock: MoreThan(0),
          },
        });

        if (!foundProduct) throw new NotFoundException('Product not found');

        foundProduct.stock -= 1;
        const savedProduct = await this.productsRepository.save(foundProduct);

        return savedProduct;
      }),
    );

    // Calculate the price of the products
    const price: number = dbProducts.reduce(
      (acc: number, product: Product) => Number(acc) + Number(product.price),
      0,
    );

    // Create an order detail with the price, the saved order, and the products
    const orderDetail = this.orderDetailsRepository.create({
      price,
      order: savedOrder,
      products: dbProducts,
    });
    const savedOrderDetail =
      await this.orderDetailsRepository.save(orderDetail);
    savedOrder.order_detail = savedOrderDetail;
    await this.ordersRepository.save(savedOrder);

    // Find the order with the order detail
    const resultOrder = await this.ordersRepository.findOne({
      relations: ['order_detail'],
      where: { id: savedOrder.id },
    });

    // Throw a NotFoundException if the order is not found
    if (!resultOrder) throw new NotFoundException('Order not found');

    return resultOrder;
  }

  async getOrder(id: string): Promise<Order> {
    // Find the order by the id with the order detail, the user, and the user's orders
    const order = await this.ordersRepository.findOne({
      relations: [
        'order_detail',
        'order_detail.products',
        'user',
        'user.orders',
      ],
      where: { id },
    });

    // Throw a NotFoundException if the order is not found
    if (!order) throw new NotFoundException('Order not found');

    return order;
  }
}
