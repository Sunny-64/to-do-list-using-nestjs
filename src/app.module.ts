import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { cwd, env } from 'process';
import {join} from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.model';
import { User } from './user/user.model';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    TaskModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver, 
      autoSchemaFile : true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
