import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (user) throw new ConflictException('User already exists');

    const newUser = this.userRepository.create(createUserDto);

    const createdUser = await this.userRepository.save(newUser);

    return createdUser.id;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    const updateResult = await this.userRepository.update(id, updateUserDto);

    if (!updateResult)
      throw new InternalServerErrorException('User could not be updated');

    return 'updated';
  }

  async delete(id: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.delete({ id });

    return id;
  }
}
