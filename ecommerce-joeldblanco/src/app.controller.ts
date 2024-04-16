import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seeders')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('categories/seeder')
  categoriesSeeder() {
    this.appService.seedCategories();
  }

  @Get('products/seeder')
  productsSeeder() {
    this.appService.seedProducts();
  }
}
