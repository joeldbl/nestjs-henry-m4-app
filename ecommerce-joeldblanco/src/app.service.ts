import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from './categories/entities/category.entity';
import * as data from './helpers/data.json';

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

  //TODO: Refactor this to start using EntityManager methods from TypeORM
  async seedCategories() {
    type DataProduct = {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    };

    try {
      const categoriesNamesSet: Set<string> = new Set(
        data.map((product: DataProduct) => product.category),
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

  //TODO: Refactor this to start using EntityManager methods from TypeORM
  async seedProducts() {
    type DataProduct = {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    };

    try {
      const products = await Promise.all(
        data.map(async (product: DataProduct) => {
          const { category, ...productWithoutCategory } = product;
          const categoryObject = await this.categoryRepository.findOneBy({
            name: category,
          });

          if (!categoryObject)
            throw new NotFoundException('Category not found');

          return { category: categoryObject, ...productWithoutCategory };
        }),
      );

      console.log(products);

      products.forEach(async (product) => {
        const toSaveProduct = this.productsRepository.create(product);
        await this.productsRepository.save(toSaveProduct);
      });
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }
}
