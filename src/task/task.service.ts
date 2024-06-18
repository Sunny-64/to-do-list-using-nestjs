import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '../db/prisma.service';
import { CreateTaskInput } from './task.input';

interface TaskUpdateData {
    task?: string | Prisma.StringFieldUpdateOperationsInput;
    isCompleted?: string | boolean | Prisma.BoolFieldUpdateOperationsInput;
}

type TaskCreateInputWithoutUser = Omit<Prisma.TaskCreateInput, 'user'>

@Injectable()
export class TaskService {
    constructor(private prisma : PrismaService) {}

    private parseTaskUpdateData(task: TaskUpdateData): Prisma.TaskUpdateInput {
        return {
            ...task,
            isCompleted: typeof task.isCompleted === 'string' ? task.isCompleted === 'true' : task.isCompleted,
            updatedAt: new Date()
        };
    }

    // add task
    async addTask (task:Prisma.TaskUncheckedCreateInput){
        const res = await this.prisma.task.create({
            data : {
                ...task,
            } 
        }); 
        return res;
    }

    // get tasks
    async findAllTasksOfUser (userId : number) {
        const res = await this.prisma.task.findMany({
            where : {
                userId
            }
        }); 
        return res; 
    }

    // get task with id
    async findTaskWithId (userId:number, taskId: number) {
        const res = await this.prisma.task.findUnique({
            where : {
                userId, 
                id : taskId
            }
        }); 

        if(!res){
            throw new UnauthorizedException(); 
        }
        return res; 
    }

    // update task with id
    async updateTaskWithId (userId:number, taskId:number, task:Prisma.TaskUpdateInput) {
        const parsedTask = this.parseTaskUpdateData(task)
        const res = await this.prisma.task.update({
            where : {
                userId, 
                id : taskId, 
            }, 
            data : parsedTask
        }); 

        if(!res) {
            throw new UnauthorizedException()
        }

        return res; 
    }

    // delete task with id
    async deleteTaskWithId (userId : number, taskId : number) {
        const res = await this.prisma.task.delete({
            where : {
                userId, 
                id : taskId
            }
        }); 

        if(!res){
            throw new UnauthorizedException(); 
        }
        return res; 
    }
}
