import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../db/prisma.service';
import { UserService } from '../user/user.service';
import { TaskResolver } from './task.resolver';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, UserService, TaskResolver]
})
export class TaskModule {}
