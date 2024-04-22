import { Module } from '@nestjs/common';
import { FileManagementService } from './file_management.service';
import { FileManagementController } from './file_management.controller';
import { FileManagementRepository } from './file_management.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileManagementController],
  providers: [FileManagementService, FileManagementRepository],
})
export class FileManagementModule {}
