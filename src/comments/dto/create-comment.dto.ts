import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  task_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  member_id: number;

  @ApiProperty({ example: 'Tampilan login sudah selesai dibuat.' })
  @IsString()
  @IsNotEmpty()
  content: string;
}