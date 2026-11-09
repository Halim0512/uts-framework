import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ example: 'Halim Wiko' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'halim@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '081234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}