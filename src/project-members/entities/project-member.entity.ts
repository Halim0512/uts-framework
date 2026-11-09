
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

import { Project } from '../../projects/entities/project.entity';
import { Member } from '../../members/entities/member.entity';

export enum ProjectRole {
  MANAGER = 'manager',
  MEMBER = 'member',
}

@Entity('project_members')
@Unique(['project_id', 'member_id'])
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number;

  @Column()
  member_id: number;

  @Column({
    type: 'enum',
    enum: ProjectRole,
    default: ProjectRole.MEMBER,
  })
  role: ProjectRole;

  @CreateDateColumn()
  joined_at: Date;

  // Relasi ke Projects
  @ManyToOne(
    () => Project,
    (project) => project.projectMembers,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // Relasi ke Members
  @ManyToOne(
    () => Member,
    (member) => member.projectMembers,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
