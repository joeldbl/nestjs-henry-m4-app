import { IsUUID, IsNotEmpty, IsArray } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { PickType } from '@nestjs/swagger';

export class CreateOrderDto extends PickType(Product, ['id']) {
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El userId es requerido' })
  userId: string;

  @IsArray()
  products: Product[];
}
