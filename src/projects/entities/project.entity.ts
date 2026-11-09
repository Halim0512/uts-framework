import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ProjectMember } from '../../project-members/entities/project-member.entity';
import { Task } from '../../tasks/entities/task.entity';
import { FileEntity } from '../../files/entities/file.entity';

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status: ProjectStatus;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi Projects dengan ProjectMembers
  @OneToMany(
    () => ProjectMember,
    (projectMember: ProjectMember) => projectMember.project,
  )
  projectMembers: ProjectMember[];

  @OneToMany(() => Task, (task: Task) => task.project)
  tasks: Task[];

  @OneToMany(() => FileEntity, (file: FileEntity) => file.project)
  files: FileEntity[];
}
