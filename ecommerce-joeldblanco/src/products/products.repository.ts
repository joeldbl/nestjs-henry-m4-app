import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: { category: true } });
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async create(product: CreateProductDto): Promise<string> {
    const newProduct = this.productRepository.create(product);

    const createdProduct = await this.productRepository.save(newProduct);

    return createdProduct.id;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('Product not found');

    const updatedProduct = await this.productRepository.save({
      id,
      ...updateProductDto,
    });

    return updatedProduct.id;
  }

  async delete(id: string): Promise<string> {
    const product = this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('Product not found');

    this.productRepository.delete({ id });

    return id;
  }
}
