import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  /**
   * Product name
   * @example 'Product Name'
   */
  @IsString()
  name: string;

  /**
   * Product description
   * @example 'Product description'
   */
  @IsString()
  description: string;

  /**
   * Product price
   * @example 100
   */
  @IsNumber()
  price: number;

  /**
   * Product stock
   * @example 10
   */
  @IsNumber()
  stock: number;

  /**
   * Product image URL
   * @example 'https://example.com/image.jpg'
   */
  @IsString()
  imgUrl: string;
}
