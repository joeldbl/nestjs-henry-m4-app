import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSigninDto } from './dto/auth-signin.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthSignupDto } from './dto/auth-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async authSignin(authSigninDto: AuthSigninDto) {
    const user = await this.userRepository.findOneBy({
      email: authSigninDto.email,
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordCompare = await bcrypt.compare(
      authSigninDto.password,
      user.password,
    );

    if (!passwordCompare)
      throw new UnauthorizedException('Invalid credentials');

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(userPayload);

    return { success: 'User succefully logged in', token };
  }

  async authSignup(authSignupDto: AuthSignupDto) {
    const { password, passwordConfirmation, ...user } = authSignupDto;

    if (password !== passwordConfirmation)
      throw new BadRequestException(
        'Password and password confirmation must coincide.',
      );

    const userExists = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (userExists) throw new ConflictException('User already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      password: hashedPassword,
      ...user,
    });

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }
}
