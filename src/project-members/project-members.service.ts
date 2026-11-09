import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProjectMember } from './entities/project-member.entity';
import { Project } from '../projects/entities/project.entity';
import { Member } from '../members/entities/member.entity';

import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { UpdateProjectMemberDto } from './dto/update-project-member.dto';

@Injectable()
export class ProjectMembersService {
  constructor(
    @InjectRepository(ProjectMember)
    private readonly projectMemberRepository: Repository<ProjectMember>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(dto: CreateProjectMemberDto) {
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

    const existing = await this.projectMemberRepository.findOneBy({
      project_id: dto.project_id,
      member_id: dto.member_id,
    });

    if (existing) {
      throw new ConflictException(
        'Member sudah terdaftar pada project ini',
      );
    }

    const projectMember = this.projectMemberRepository.create(dto);

    return await this.projectMemberRepository.save(projectMember);
  }

  async findAll() {
    return await this.projectMemberRepository.find({
      relations: {
        project: true,
        member: true,
      },
    });
  }

  async findOne(id: number) {
    const data = await this.projectMemberRepository.findOne({
      where: { id },
      relations: {
        project: true,
        member: true,
      },
    });

    if (!data) {
      throw new NotFoundException(
        `Project member dengan ID ${id} tidak ditemukan`,
      );
    }

    return data;
  }

  async update(id: number, dto: UpdateProjectMemberDto) {
    const data = await this.findOne(id);

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

    const projectId = dto.project_id ?? data.project_id;
    const memberId = dto.member_id ?? data.member_id;

    const duplicate = await this.projectMemberRepository.findOneBy({
      project_id: projectId,
      member_id: memberId,
    });

    if (duplicate && duplicate.id !== id) {
      throw new ConflictException(
        'Member sudah terdaftar pada project ini',
      );
    }

    Object.assign(data, dto);

    return await this.projectMemberRepository.save(data);
  }

  async remove(id: number) {
    const data = await this.findOne(id);

    await this.projectMemberRepository.remove(data);

    return {
      message: 'Member berhasil dikeluarkan dari project',
    };
  }
}