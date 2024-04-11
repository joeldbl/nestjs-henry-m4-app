import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class AuthSigninDto {
  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @MaxLength(60)
  @IsNotEmpty()
  password: string;
}
