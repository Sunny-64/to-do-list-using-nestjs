import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../db/prisma.service';
import { UserResolver } from './user.resolver';
import { TaskResolver } from '../task/task.resolver';
import { TaskService } from 'src/task/task.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserResolver, TaskResolver, TaskService]
})
export class UserModule {}
