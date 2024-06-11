import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma : PrismaService) {}

    // add task
    async addTask (userId:number, task:string){
        const res = await this.prisma.task.create({
            data : {
                userId, 
                task
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
        const res = await this.prisma.task.update({
            where : {
                userId, 
                id : taskId, 
            }, 
            data : task
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
