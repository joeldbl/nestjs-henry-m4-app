import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService implements OnApplicationBootstrap {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  async onApplicationBootstrap() {
    await this.seedCategories();
  }

  async seedCategories() {
    return this.categoryRepository.addCategories();
  }

  async findAll() {
    return this.categoryRepository.getCategories();
  }
}
