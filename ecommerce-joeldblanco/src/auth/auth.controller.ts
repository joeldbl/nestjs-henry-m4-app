import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(): string {
    return 'Get Auth';
  }

  @Post('signin')
  signin(
    @Body(new ValidationPipe()) AuthSigninDto: AuthSigninDto,
  ): Promise<Omit<User, 'password'>> {
    return this.authService.authSignin(AuthSigninDto);
  }
}
