
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Project } from '../../projects/entities/project.entity';
import { Member } from '../../members/entities/member.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number;

  @Column()
  member_id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
  })
  type: string;

  @Column({
    type: 'bigint',
  })
  size: string;

  @Column({
    length: 255,
  })
  path: string;

  @CreateDateColumn()
  uploaded_at: Date;

  // Relasi Files dengan Projects
  @ManyToOne(
    () => Project,
    (project) => project.files,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // Relasi Files dengan Members
  @ManyToOne(
    () => Member,
    (member) => member.files,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
