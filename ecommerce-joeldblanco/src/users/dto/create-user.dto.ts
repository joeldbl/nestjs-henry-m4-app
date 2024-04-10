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
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

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

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  address: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  country?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsOptional()
  city?: string;
}
