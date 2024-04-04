import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [
    {
      id: 1,
      email: 'asmith@mail.com',
      name: 'Alice Smith',
      password: 'password',
      address: '5678 Elm St',
      phone: '987-654-3210',
      country: 'United States',
      city: 'New York',
    },
    {
      id: 2,
      email: 'bjohnson@mail.com',
      name: 'Bob Johnson',
      password: 'password',
      address: '5678 Elm St',
      phone: '987-654-3210',
      country: 'United States',
      city: 'New York',
    },
  ];

  async getUsers() {
    return await this.users;
  }
}
