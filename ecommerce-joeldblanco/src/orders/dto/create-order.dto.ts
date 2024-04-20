import { IsUUID, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsUUID('4', { message: 'The userId must be a valid UUID' })
  @IsNotEmpty({ message: 'The userId is required' })
  userId: string;

  @IsArray()
  @IsNotEmpty({ message: 'The products array is required' })
  @ArrayMinSize(1, {
    message: 'There must be at least one product in the array',
  })
  products: Product[];
}
