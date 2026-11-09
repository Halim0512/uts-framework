import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { Member } from '../members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Task, Member])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}