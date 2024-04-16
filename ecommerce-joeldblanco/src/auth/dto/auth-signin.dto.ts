import { PickType } from '@nestjs/swagger';
import { AuthSignupDto } from './auth-signup.dto';

export class AuthSigninDto extends PickType(AuthSignupDto, [
  'email',
  'password',
]) {}
