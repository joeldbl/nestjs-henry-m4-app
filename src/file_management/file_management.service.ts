import { Injectable, NotFoundException } from '@nestjs/common';
import { FileManagementRepository } from './file_management.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileManagementService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly fileManagementRepository: FileManagementRepository,
  ) {}
  async create(id: string, file: Express.Multer.File): Promise<string> {
    const uploadedImage = await this.fileManagementRepository.uploadImage(file);

    const product = await this.productsRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('Product not found');

    product.imgUrl = uploadedImage['secure_url'];

    await this.productsRepository.save(product);

    return 'Image succesfully updated,';
  }
}
