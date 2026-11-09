
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Project } from '../../projects/entities/project.entity';
import { Comment } from '../../comments/entities/comment.entity';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number;

  @Column({ length: 150 })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({
    type: 'date',
    nullable: true,
  })
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi Tasks dengan Projects
  @ManyToOne(
    () => Project,
    (project) => project.tasks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // Relasi Tasks dengan Comments
  @OneToMany(
    () => Comment,
    (comment) => comment.task,
  )
  comments: Comment[];
}
