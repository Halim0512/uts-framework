import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FileEntity } from './entities/file.entity';
import { Project } from '../projects/entities/project.entity';
import { Member } from '../members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, Project, Member])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}