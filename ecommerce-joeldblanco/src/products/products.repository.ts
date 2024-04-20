import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../helpers/data.json';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const products: Product[] = await this.productRepository.find({
      relations: { category: true },
    });

    const start: number = limit * page - limit;
    const end: number = page * limit;
    const paginatedProducts: Product[] = products.slice(start, end);

    return paginatedProducts;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const product: Product | null = await this.productRepository.findOneBy({
      id,
    });

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
    const product: Product | null = await this.productRepository.findOneBy({
      id,
    });

    if (!product) throw new NotFoundException('Product not found');

    const updatedProduct: Product = await this.productRepository.save({
      id,
      ...updateProductDto,
    });

    return updatedProduct.id;
  }

  async delete(id: string): Promise<string> {
    const product: Product | null = await this.productRepository.findOneBy({
      id,
    });

    if (!product) throw new NotFoundException('Product not found');

    await this.productRepository.delete({ id });

    return id;
  }

  async productsSeeder() {
    if (data) {
      const categories = await this.categoryRepository.find();

      if (!categories.length)
        throw new NotFoundException('Categories not found');

      for (const product of data) {
        const category: Category | null =
          await this.categoryRepository.findOneBy({
            name: product.category,
          });

        if (!category) throw new NotFoundException('Category not found');

        await this.productRepository.upsert(
          [
            {
              ...product,
              category,
            },
          ],
          ['name'],
        );
      }
    }

    return await this.productRepository.find();
  }
}
