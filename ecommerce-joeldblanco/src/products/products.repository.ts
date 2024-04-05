import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 12',
      description: 'The latest iPhone model with advanced features.',
      price: 999,
      stock: true,
      imgUrl: 'https://example.com/iphone12.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      description: 'A powerful Android smartphone with a stunning display.',
      price: 899,
      stock: true,
      imgUrl: 'https://example.com/galaxys21.jpg',
    },
    {
      id: 3,
      name: 'Google Pixel 5',
      description:
        'A flagship phone with an excellent camera and clean Android experience.',
      price: 699,
      stock: false,
      imgUrl: 'https://example.com/pixel5.jpg',
    },
  ];

  async getProducts(): Promise<Product[]> {
    return await this.products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return await this.products.find((product) => product.id === id);
  }

  async create(product: CreateProductDto): Promise<number> {
    const id = this.products.length + 1;
    return await this.products.push({ id, ...product });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<number> {
    this.products = await this.products.map((product) => {
      if (product.id === id) {
        return { ...product, ...updateProductDto };
      }
      return product;
    });

    return id;
  }

  async delete(id: number): Promise<number> {
    this.products = await this.products.filter((product) => product.id !== id);
    return id;
  }
}
