import { IsArray, IsUUID } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsUUID()
  userId: 'string';

  @IsArray()
  products: Pick<Product, 'id'>[];
}
