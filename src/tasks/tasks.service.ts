import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateTaskDto) {
    const project = await this.projectRepository.findOneBy({
      id: dto.project_id,
    });

    if (!project) {
      throw new NotFoundException('Project tidak ditemukan');
    }

    const task = this.taskRepository.create(dto);

    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find({
      relations: {
        project: true,
        comments: true,
      },
    });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        project: true,
        comments: true,
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Task dengan ID ${id} tidak ditemukan`,
      );
    }

    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id);

    if (dto.project_id !== undefined) {
      const project = await this.projectRepository.findOneBy({
        id: dto.project_id,
      });

      if (!project) {
        throw new NotFoundException('Project tidak ditemukan');
      }
    }

    Object.assign(task, dto);

    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);

    await this.taskRepository.remove(task);

    return {
      message: 'Task berhasil dihapus',
    };
  }
}