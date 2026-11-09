import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { Member } from '../members/entities/member.entity';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(dto: CreateCommentDto) {
    const task = await this.taskRepository.findOneBy({
      id: dto.task_id,
    });

    if (!task) {
      throw new NotFoundException('Task tidak ditemukan');
    }

    const member = await this.memberRepository.findOneBy({
      id: dto.member_id,
    });

    if (!member) {
      throw new NotFoundException('Member tidak ditemukan');
    }

    const comment = this.commentRepository.create(dto);

    return await this.commentRepository.save(comment);
  }

  async findAll() {
    return await this.commentRepository.find({
      relations: {
        task: true,
        member: true,
      },
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        task: true,
        member: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(
        `Comment dengan ID ${id} tidak ditemukan`,
      );
    }

    return comment;
  }

  async update(id: number, dto: UpdateCommentDto) {
    const comment = await this.findOne(id);

    if (dto.task_id !== undefined) {
      const task = await this.taskRepository.findOneBy({
        id: dto.task_id,
      });

      if (!task) {
        throw new NotFoundException('Task tidak ditemukan');
      }
    }

    if (dto.member_id !== undefined) {
      const member = await this.memberRepository.findOneBy({
        id: dto.member_id,
      });

      if (!member) {
        throw new NotFoundException('Member tidak ditemukan');
      }
    }

    Object.assign(comment, dto);

    return await this.commentRepository.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);

    await this.commentRepository.remove(comment);

    return {
      message: 'Comment berhasil dihapus',
    };
  }
}