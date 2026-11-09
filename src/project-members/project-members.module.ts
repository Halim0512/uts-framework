import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectMembersController } from './project-members.controller';
import { ProjectMembersService } from './project-members.service';
import { ProjectMember } from './entities/project-member.entity';
import { Project } from '../projects/entities/project.entity';
import { Member } from '../members/entities/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectMember, Project, Member]),
  ],
  controllers: [ProjectMembersController],
  providers: [ProjectMembersService],
})
export class ProjectMembersModule {}