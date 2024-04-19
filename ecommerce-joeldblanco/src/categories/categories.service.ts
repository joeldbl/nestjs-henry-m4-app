import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  async seedCategories() {
    return this.categoryRepository.addCategories();
  }

  async findAll() {
    return this.categoryRepository.getCategories();
  }
}
