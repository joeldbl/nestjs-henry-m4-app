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
    return await this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException();

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
    const toUpdateProduct = await this.productRepository.findOneBy({ id });

    if (!toUpdateProduct) throw new NotFoundException();

    const updatedProduct = await this.productRepository.save({
      id,
      ...updateProductDto,
    });

    return updatedProduct.id;
  }

  async delete(id: string): Promise<string> {
    const toDeleteProduct = this.productRepository.findOneBy({ id });

    if (!toDeleteProduct) throw new NotFoundException();

    this.productRepository.delete({ id });

    return id;
  }
}
