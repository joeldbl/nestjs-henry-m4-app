import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockProductsService: Partial<ProductsService>;

  const mockProduct: Product = {
    id: '37fbf640-68d4-4f2c-839e-b39fc5a4aee8',
    name: 'LG UltraGear',
    description: 'The best monitor in the world',
    price: 199.99,
    stock: 12,
    imgUrl: 'https://placehold.co/180x180',
    category: {
      id: 'c40f7d41-dea7-4011-b55f-dd503f5534bc',
      name: 'monitor',
      products: [],
    },
    orders_details: [],
  };

  beforeEach(async () => {
    mockProductsService = {
      create: () => Promise.resolve('37fbf640-68d4-4f2c-839e-b39fc5a4aee8'),
      findAll: () => Promise.resolve([mockProduct]),
      findOne: (id) => Promise.resolve(mockProduct),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
