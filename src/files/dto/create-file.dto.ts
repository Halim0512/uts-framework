import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  project_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  member_id: number;

  @ApiProperty({ example: 'laporan_project.pdf' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  type: string;

  @ApiProperty({ example: '204800' })
  @IsString()
  size: string;

  @ApiProperty({ example: 'uploads/laporan_project.pdf' })
  @IsString()
  @IsNotEmpty()
  path: string;
}