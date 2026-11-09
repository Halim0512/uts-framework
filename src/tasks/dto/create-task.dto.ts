import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  TaskPriority,
  TaskStatus,
} from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  project_id: number;

  @ApiProperty({ example: 'Membuat halaman login' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Membuat tampilan login menggunakan React' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.HIGH })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({ example: '2026-12-01', required: false })
  @IsOptional()
  @IsDateString()
  due_date?: string;
}