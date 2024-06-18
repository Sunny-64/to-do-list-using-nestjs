import { Args, Mutation, Query, Resolver, ResolveField, Parent, Int } from '@nestjs/graphql';
import { User, createUserInput } from './user.model'; 
import { Task } from '../task/task.model'; 
import { UserService } from './user.service'; 
import { TaskService } from '../task/task.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly taskService : TaskService
) {} 

  @Query(returns => [User])
  @UseGuards(AuthGuard)
  async users(): Promise<User[]> {
    return this.userService.getUsers(); 
  }

  @Query(returns => User)
  @UseGuards(AuthGuard)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserWithId(id); 
  }

  @Mutation(returns => User)
  async createUser(@Args('createUserData') createUserData : createUserInput): Promise<User> {
    return this.userService.createUser(createUserData); 
  }

  // ResolveField for tasks
  @ResolveField()
  @UseGuards(AuthGuard)
  async tasks(@Parent() user: User): Promise<Task[]> {
    const userId = user.id;
    return this.taskService.findAllTasksOfUser(userId); // Implement this method in your user service
  }
}





