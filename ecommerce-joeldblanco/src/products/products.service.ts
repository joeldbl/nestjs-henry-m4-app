import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return await 'This action adds a new product';
  }

  async findAll() {
    return await this.productsRepository.getProducts();
  }

  async findOne(id: number) {
    return await `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await `This action updates a #${id} product`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} product`;
  }
}
