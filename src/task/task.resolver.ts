import { Args, Mutation, Query, Resolver, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Task } from './task.model';
import { User } from '../user/user.model';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTaskInput, UpdateTaskInput } from './task.input';
import { CurrentUser } from '../user/user.decorator';

@Resolver(of => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Query(returns => [Task])
  @UseGuards(AuthGuard)
  async tasks(@CurrentUser() user : User): Promise<Task[]> {
    return this.taskService.findAllTasksOfUser(user.id);
  }

  @Query(returns => Task)
  @UseGuards(AuthGuard)
  async task(@CurrentUser() user : User,@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.taskService.findTaskWithId(user.id, id);
  }

  @Mutation(returns => Task)
  @UseGuards(AuthGuard)
  async createTask(@CurrentUser() user : User, @Args('createTaskData') createTaskData: CreateTaskInput): Promise<Task> {
    const payload = {
      ...createTaskData, 
      userId : user.id
    }
    return this.taskService.addTask(payload);
  }

  @Mutation(returns => Task)
  @UseGuards(AuthGuard)
  async updateTask(
    @CurrentUser() user : User, 
    @Args('id', {type : () => Int}) id : number, 
    @Args('updateTaskData') updateTaskData : UpdateTaskInput
): Promise<Task> {
    return this.taskService.updateTaskWithId(user.id, id, updateTaskData);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard)
  async deleteTask(@CurrentUser() user : User, @Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.taskService.deleteTaskWithId(user.id, id);
  }

  @ResolveField(returns => User)
  async user(@Parent() task: Task): Promise<User> {
    return this.userService.getUserWithId(task.userId);
  }
}
