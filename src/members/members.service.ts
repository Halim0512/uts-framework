import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(dto: CreateMemberDto) {
    const existingMember = await this.memberRepository.findOneBy({
      email: dto.email,
    });

    if (existingMember) {
      throw new ConflictException('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const member = this.memberRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const savedMember = await this.memberRepository.save(member);

    const { password, ...result } = savedMember;

    return result;
  }

  async findAll() {
    const members = await this.memberRepository.find({
      relations: {
        projectMembers: true,
        comments: true,
        files: true,
      },
    });

    return members.map(({ password, ...member }) => member);
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: {
        projectMembers: true,
        comments: true,
        files: true,
      },
    });

    if (!member) {
      throw new NotFoundException(
        `Member dengan ID ${id} tidak ditemukan`,
      );
    }

    const { password, ...result } = member;

    return result;
  }

  async update(id: number, dto: UpdateMemberDto) {
    const member = await this.memberRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!member) {
      throw new NotFoundException(
        `Member dengan ID ${id} tidak ditemukan`,
      );
    }

    if (dto.email && dto.email !== member.email) {
      const existingMember = await this.memberRepository.findOneBy({
        email: dto.email,
      });

      if (existingMember) {
        throw new ConflictException('Email sudah digunakan');
      }
    }

    const updateData: Partial<Member> = { ...dto };

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(member, updateData);

    const updatedMember = await this.memberRepository.save(member);

    const { password, ...result } = updatedMember;

    return result;
  }

  async remove(id: number) {
    const member = await this.memberRepository.findOneBy({ id });

    if (!member) {
      throw new NotFoundException(
        `Member dengan ID ${id} tidak ditemukan`,
      );
    }

    await this.memberRepository.remove(member);

    return {
      message: 'Member berhasil dihapus',
    };
  }
}