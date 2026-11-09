
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ProjectMember } from '../../project-members/entities/project-member.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { FileEntity } from '../../files/entities/file.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    length: 255,
    select: false,
  })
  password: string;

  @Column({
    length: 20,
    nullable: true,
  })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi Members dengan ProjectMembers
@OneToMany(
  () => ProjectMember,
  (projectMember: ProjectMember) => projectMember.member,
)
projectMembers: ProjectMember[];

@OneToMany(
  () => Comment,
  (comment: Comment) => comment.member,
)
comments: Comment[];

@OneToMany(
  () => FileEntity,
  (file: FileEntity) => file.member,
)
files: FileEntity[];}
