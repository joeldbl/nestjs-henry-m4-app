import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { AuthSigninDto } from './dto/auth-signin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authSignin(authSigninDto: AuthSigninDto) {
    const { email, password } = authSigninDto;
    const user = await this.userRepository.getUserByEmail(email);

    if (!user || password !== user.password) throw new UnauthorizedException();

    return true;
  }
}
