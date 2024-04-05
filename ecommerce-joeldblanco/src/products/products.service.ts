import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<number> {
    return await this.productsRepository.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.getProducts();
  }

  async findOne(id: number): Promise<Product | undefined> {
    return await this.productsRepository.getProductById(+id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<number> {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<number> {
    return await this.productsRepository.delete(id);
  }
}
