import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthSigninDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  pass: string;
}
