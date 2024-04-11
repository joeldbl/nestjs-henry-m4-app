import {
  Post,
  Body,
  Controller,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersInterceptor } from 'src/users/users.interceptor';

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
  signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.authSignup(createUserDto);
  }
}
