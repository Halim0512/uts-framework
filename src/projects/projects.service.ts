import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto) {
    const project = this.projectRepository.create(dto);
    return await this.projectRepository.save(project);
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: {
        projectMembers: true,
        tasks: true,
        files: true,
      },
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: {
        projectMembers: true,
        tasks: true,
        files: true,
      },
    });

    if (!project) {
      throw new NotFoundException(
        `Project dengan ID ${id} tidak ditemukan`,
      );
    }

    return project;
  }

  async update(id: number, dto: UpdateProjectDto) {
    const project = await this.findOne(id);

    Object.assign(project, dto);

    return await this.projectRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);

    await this.projectRepository.remove(project);

    return {
      message: 'Project berhasil dihapus',
    };
  }
}