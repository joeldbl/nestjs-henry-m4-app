import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 1})
  password: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  country?: string;

  @IsString()
  city?: string;
}
