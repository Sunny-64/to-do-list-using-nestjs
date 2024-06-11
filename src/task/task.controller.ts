import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TaskService } from './task.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('task')
export class TaskController {
    constructor(private taskService : TaskService){}
    
    @Post()
    @UseGuards(AuthGuard)
    createTask (@Req() req : Request , @Body() task : string) {
        return this.taskService.addTask(req['user'].userId, task); 
    }

    @Get()
    @UseGuards(AuthGuard)
    getUserTasks (@Req() req : Request) {
        return this.taskService.findAllTasksOfUser(req['user'].userId); 
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getTaskWithId(@Req() req : Request, @Param('id', ParseIntPipe) taskId : number){
        return this.taskService.findTaskWithId(req['user'].userId, taskId); 
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    updateTaskWithId(@Req() req : Request, @Param('id', ParseIntPipe) taskId : number, @Body() task : Prisma.TaskUpdateInput){
        return this.taskService.updateTaskWithId(req['user'].userId, taskId, task); 
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteTaskWithId(@Req() req : Request, @Param('id', ParseIntPipe) taskId : number){
        return this.taskService.deleteTaskWithId(req['user'].userId, taskId); 
    }
}
