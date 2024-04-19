import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../helpers/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async addCategories() {
    try {
      if (data) {
        for (const element of data) {
          try {
            await this.categoryRepository
              .createQueryBuilder()
              .insert()
              .into(Category)
              .values({ name: element.category })
              .orIgnore(true)
              .execute();
          } catch (error) {
            console.error('Error inserting category:', error);
          }
        }
      }
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  async getCategories() {
    return await this.categoryRepository.find();
  }
}
