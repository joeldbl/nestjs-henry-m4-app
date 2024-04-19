import { ApiProperty } from '@nestjs/swagger';
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

export class AuthSignupDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'The name of the user',
    minLength: 3,
    maxLength: 50,
  })
  name: string;

  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'The email of the user',
    maxLength: 50,
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'The password of the user',
    maxLength: 20,
    example: 'Password1234$',
  })
  password: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'The password confirmation of the user',
    maxLength: 20,
    example: 'Password1234$',
  })
  passwordConfirmation: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: Number,
    description: 'The phone number of the user',
  })
  phone: number;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'The address of the user',
    minLength: 3,
    maxLength: 80,
  })
  address: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'The country of the user',
    minLength: 5,
    maxLength: 20,
  })
  country?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'The city of the user',
    minLength: 5,
    maxLength: 50,
  })
  city?: string;
}
