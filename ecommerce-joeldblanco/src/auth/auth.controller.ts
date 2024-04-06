import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './dto/auth-signin.dto';

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
  ): Promise<boolean> {
    return this.authService.authSignin(AuthSigninDto);
  }
}
