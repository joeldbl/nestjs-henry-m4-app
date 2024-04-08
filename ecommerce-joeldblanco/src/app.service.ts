import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductsRepository } from './products/products.repository';
import { Repository } from 'typeorm';
import { Category } from './categories/entities/category.entity';
import * as fs from 'fs';
import path, { dirname, parse } from 'path';
import { CreateCategoryDto } from './categories/dto/create-category.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async seedCategories() {
    type DataProduct = {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    };

    try {
      const data = await fs.promises.readFile('./src/helpers/data.js', 'utf8');

      const parsedData = JSON.parse(data);

      const categoriesNamesSet: Set<string> = new Set(
        parsedData.map((product: DataProduct) => product.category),
      );

      const categoriesNamesArray: string[] = Array.from(categoriesNamesSet);

      categoriesNamesArray.forEach(async (categoryName) => {
        const category = this.categoryRepository.create({ name: categoryName });
        await this.categoryRepository.save({ ...category });
      });
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  async seedProducts() {
    type DataProduct = {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    };

    try {
      const data = await fs.promises.readFile('./src/helpers/data.js', 'utf8');

      const parsedData = JSON.parse(data);

      const products = await Promise.all(
        parsedData.map(async (product: DataProduct) => {
          const { category, ...productWithoutCategory } = product;

          const categoryObject = await this.categoryRepository.findOneBy({
            name: category,
          });

          return { categoryObject, ...productWithoutCategory };
        }),
      );

      products.forEach(async (product: Product) => {
        const toSaveProduct = this.productsRepository.create(product);
        await this.productsRepository.save(toSaveProduct);
      });
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }
}
