
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';
import { Member } from '../../members/entities/member.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task_id: number;

  @Column()
  member_id: number;

  @Column({
    type: 'text',
  })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  // Relasi Comments dengan Tasks
  @ManyToOne(
    () => Task,
    (task) => task.comments,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'task_id' })
  task: Task;

  // Relasi Comments dengan Members
  @ManyToOne(
    () => Member,
    (member) => member.comments,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
