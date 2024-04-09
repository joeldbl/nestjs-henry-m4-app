import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  userId: 'string';
  products: Pick<Product, 'id'>[];
}
