import {
  IsString,
  IsStrongPassword,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @MaxLength(15)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  country?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  city?: string;

  @IsNumber()
  phone: string;
}
