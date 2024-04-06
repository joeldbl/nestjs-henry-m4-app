import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<number> {
    const newUserId = this.userRepository.create(createUserDto);
    return newUserId;
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    return await this.userRepository.getUsers(page, limit);
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.getUserById(+id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
