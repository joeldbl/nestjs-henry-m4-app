import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { AuthSigninDto } from './dto/auth-signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authSignin(authSigninDto: AuthSigninDto) {
    const { email, pass } = authSigninDto;

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new UnauthorizedException();

    const passwordCompare = await bcrypt.compare(pass, user.password);
    if (!passwordCompare) throw new UnauthorizedException();

    const { password, ...result } = user;

    return result;
  }
}
