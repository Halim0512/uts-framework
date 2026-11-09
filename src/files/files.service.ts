import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity } from './entities/file.entity';
import { Project } from '../projects/entities/project.entity';
import { Member } from '../members/entities/member.entity';

import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(dto: CreateFileDto) {
    const project = await this.projectRepository.findOneBy({
      id: dto.project_id,
    });

    if (!project) {
      throw new NotFoundException('Project tidak ditemukan');
    }

    const member = await this.memberRepository.findOneBy({
      id: dto.member_id,
    });

    if (!member) {
      throw new NotFoundException('Member tidak ditemukan');
    }

    const file = this.fileRepository.create(dto);

    return await this.fileRepository.save(file);
  }

  async findAll() {
    return await this.fileRepository.find({
      relations: {
        project: true,
        member: true,
      },
    });
  }

  async findOne(id: number) {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: {
        project: true,
        member: true,
      },
    });

    if (!file) {
      throw new NotFoundException(`File dengan ID ${id} tidak ditemukan`);
    }

    return file;
  }

  async update(id: number, dto: UpdateFileDto) {
    const file = await this.findOne(id);

    if (dto.project_id !== undefined) {
      const project = await this.projectRepository.findOneBy({
        id: dto.project_id,
      });

      if (!project) {
        throw new NotFoundException('Project tidak ditemukan');
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

    Object.assign(file, dto);

    return await this.fileRepository.save(file);
  }

  async remove(id: number) {
    const file = await this.findOne(id);

    await this.fileRepository.remove(file);

    return {
      message: 'File berhasil dihapus',
    };
  }
}
