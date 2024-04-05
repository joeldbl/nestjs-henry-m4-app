import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'iPhone 12',
      description: 'The latest iPhone model with advanced features.',
      price: 999,
      stock: true,
      imgUrl: 'https://example.com/iphone12.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      description: 'A powerful Android smartphone with a stunning display.',
      price: 899,
      stock: true,
      imgUrl: 'https://example.com/galaxys21.jpg',
    },
    {
      id: 3,
      name: 'Google Pixel 5',
      description:
        'A flagship phone with an excellent camera and clean Android experience.',
      price: 699,
      stock: false,
      imgUrl: 'https://example.com/pixel5.jpg',
    },
  ];

  async getProducts() {
    return await this.products;
  }

  async getProductById(id: number) {
    return await this.products.find((product) => product.id === id);
  }
}
