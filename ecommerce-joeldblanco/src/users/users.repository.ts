import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    const users = await this.userRepository.find();
    const start = limit * page - limit;
    const end = page * limit;
    const paginatedUsers = users.slice(start, end);
    return paginatedUsers;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(user: CreateUserDto): Promise<string> {
    // const { password, ...toSaveUser } = user;
    // const hashedPassword = await bcrypt.hash(password, 10);

    // const newUser = this.userRepository.create({
    //   password: hashedPassword,
    //   ...toSaveUser,
    // });

    // const savedUser = await this.userRepository.save(newUser);

    const createdUser = await this.userRepository.save(user);
    const savedUser = await this.userRepository.save(createdUser);

    return savedUser.id;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    const updatedUser = await this.userRepository.save({ ...updateUserDto });

    return updatedUser.id;
  }

  async delete(id: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.delete({ id });

    return id;
  }
}
