import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService implements OnApplicationBootstrap {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async onApplicationBootstrap() {
    await this.seedProducts();
  }

  async create(createProductDto: CreateProductDto): Promise<string> {
    return await this.productsRepository.create(createProductDto);
  }

  async findAll(page: number, limit: number): Promise<Product[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async findOne(id: string): Promise<Product | undefined> {
    return await this.productsRepository.getProductById(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<string> {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string): Promise<string> {
    return await this.productsRepository.delete(id);
  }

  async seedProducts() {
    return await this.productsRepository.productsSeeder();
  }
}
