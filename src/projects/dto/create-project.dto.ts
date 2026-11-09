import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({ example: 'TeamFlow Website' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Project kolaborasi mahasiswa' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: ProjectStatus, example: ProjectStatus.ACTIVE })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @ApiProperty({ example: '2026-11-09' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ example: '2026-12-30' })
  @IsDateString()
  @IsOptional()
  end_date?: string;
}