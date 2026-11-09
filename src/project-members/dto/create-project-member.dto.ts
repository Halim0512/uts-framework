import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { ProjectRole } from '../entities/project-member.entity';

export class CreateProjectMemberDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  project_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  member_id: number;

  @ApiProperty({ enum: ProjectRole, example: ProjectRole.MEMBER })
  @IsEnum(ProjectRole)
  role: ProjectRole;
}