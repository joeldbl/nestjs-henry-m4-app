import { CreateProductDto } from './create-product.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateProductDto extends PickType(CreateProductDto, [
  'name',
  'description',
  'price',
  'stock',
  'imgUrl',
]) {
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
}
