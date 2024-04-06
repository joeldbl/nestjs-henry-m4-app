import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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
    {
      id: 3,
      email: 'csmith@mail.com',
      name: 'Charlie Smith',
      password: 'password',
      address: '1234 Oak St',
      phone: '123-456-7890',
      country: 'United States',
      city: 'Los Angeles',
    },
    {
      id: 4,
      email: 'djohnson@mail.com',
      name: 'David Johnson',
      password: 'password',
      address: '5678 Elm St',
      phone: '987-654-3210',
      country: 'United States',
      city: 'New York',
    },
    {
      id: 5,
      email: 'esmith@mail.com',
      name: 'Emma Smith',
      password: 'password',
      address: '4321 Maple St',
      phone: '555-555-5555',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 6,
      email: 'fjohnson@mail.com',
      name: 'Frank Johnson',
      password: 'password',
      address: '8765 Pine St',
      phone: '111-222-3333',
      country: 'United States',
      city: 'Chicago',
    },
    {
      id: 7,
      email: 'gsmith@mail.com',
      name: 'Grace Smith',
      password: 'password',
      address: '9876 Cedar St',
      phone: '444-444-4444',
      country: 'United States',
      city: 'San Francisco',
    },
    {
      id: 8,
      email: 'hjohnson@mail.com',
      name: 'Henry Johnson',
      password: 'password',
      address: '5432 Birch St',
      phone: '777-888-9999',
      country: 'United States',
      city: 'Seattle',
    },
    {
      id: 9,
      email: 'ismith@mail.com',
      name: 'Isabella Smith',
      password: 'password',
      address: '1357 Walnut St',
      phone: '000-111-2222',
      country: 'United States',
      city: 'Boston',
    },
    {
      id: 10,
      email: 'jjohnson@mail.com',
      name: 'James Johnson',
      password: 'password',
      address: '8642 Oak St',
      phone: '333-444-5555',
      country: 'United States',
      city: 'Miami',
    },
    {
      id: 11,
      email: 'ksmith@mail.com',
      name: 'Kevin Smith',
      password: 'password',
      address: '2468 Elm St',
      phone: '666-777-8888',
      country: 'United States',
      city: 'Dallas',
    },
    {
      id: 12,
      email: 'ljohnson@mail.com',
      name: 'Lily Johnson',
      password: 'password',
      address: '7531 Maple St',
      phone: '999-000-1111',
      country: 'United States',
      city: 'Houston',
    },
    {
      id: 13,
      email: 'msmith@mail.com',
      name: 'Mason Smith',
      password: 'password',
      address: '9876 Pine St',
      phone: '222-333-4444',
      country: 'United States',
      city: 'Atlanta',
    },
    {
      id: 14,
      email: 'njohnson@mail.com',
      name: 'Nora Johnson',
      password: 'password',
      address: '1234 Cedar St',
      phone: '555-666-7777',
      country: 'United States',
      city: 'Denver',
    },
    {
      id: 15,
      email: 'osmith@mail.com',
      name: 'Oliver Smith',
      password: 'password',
      address: '5678 Birch St',
      phone: '888-999-0000',
      country: 'United States',
      city: 'Phoenix',
    },
    {
      id: 16,
      email: 'pjohnson@mail.com',
      name: 'Penelope Johnson',
      password: 'password',
      address: '4321 Walnut St',
      phone: '111-222-3333',
      country: 'United States',
      city: 'Austin',
    },
    {
      id: 17,
      email: 'qsmith@mail.com',
      name: 'Quinn Smith',
      password: 'password',
      address: '8765 Oak St',
      phone: '444-555-6666',
      country: 'United States',
      city: 'San Diego',
    },
    {
      id: 18,
      email: 'rjohnson@mail.com',
      name: 'Ruby Johnson',
      password: 'password',
      address: '9876 Maple St',
      phone: '777-888-9999',
      country: 'United States',
      city: 'Portland',
    },
    {
      id: 19,
      email: 'ssmith@mail.com',
      name: 'Samuel Smith',
      password: 'password',
      address: '5432 Pine St',
      phone: '000-111-2222',
      country: 'United States',
      city: 'Las Vegas',
    },
    {
      id: 20,
      email: 'tjohnson@mail.com',
      name: 'Taylor Johnson',
      password: 'password',
      address: '1357 Cedar St',
      phone: '333-444-5555',
      country: 'United States',
      city: 'Orlando',
    },
  ];

  async getUsers(page: number, limit: number): Promise<User[]> {
    const users = await this.users;
    const start = limit * page - limit;
    const end = page * limit;
    const paginatedUsers = users.slice(start, end);
    return paginatedUsers;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.users.find((user) => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.users.find((user) => user.email === email);
  }

  async create(user: CreateUserDto): Promise<number> {
    const id = this.users.length + 1;
    const { password, ...toSaveUser } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.users.push({
      id,
      ...toSaveUser,
      password: hashedPassword,
    });
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
