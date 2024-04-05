import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  private users: User[] = [
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

  async getUsers(): Promise<User[]> {
    return await this.users;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.users.find((user) => user.id === id);
  }

  async create(user: CreateUserDto): Promise<number> {
    const id = this.users.length;
    return await this.users.push({ id, ...user });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    this.users = await this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return id;
  }

  async delete(id: number): Promise<number> {
    this.users = await this.users.filter((user) => user.id !== id);
    return id;
  }
}
