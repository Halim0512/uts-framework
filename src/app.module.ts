import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';
import { ProjectMembersModule } from './project-members/project-members.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'teamflow_db'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    ProjectsModule,
    MembersModule,
    ProjectMembersModule,
    TasksModule,
    CommentsModule,
    FilesModule,
  ],
})
export class AppModule {}