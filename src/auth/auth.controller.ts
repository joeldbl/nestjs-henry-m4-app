import {
  Post,
  Body,
  Controller,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { UsersInterceptor } from 'src/users/users.interceptor';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseInterceptors(UsersInterceptor)
  signin(@Body(new ValidationPipe()) authSigninDto: AuthSigninDto) {
    return this.authService.authSignin(authSigninDto);
  }

  @Post('signup')
  @UseInterceptors(UsersInterceptor)
  signup(@Body(new ValidationPipe()) authSignupDto: AuthSignupDto) {
    return this.authService.authSignup(authSignupDto);
  }
}
