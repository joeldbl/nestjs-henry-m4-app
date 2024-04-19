import { IsUUID, IsNotEmpty, IsArray } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El userId es requerido' })
  userId: string;

  @IsArray()
  @IsNotEmpty({ message: 'El array de productos es requerido' })
  products: Product[];
}
