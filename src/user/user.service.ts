import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User} from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
    constructor (private prisma : PrismaService){}

    async checkIfUserExist (param : string | number) : Promise<User>{
        let checkIfUserExist : User | null = null; 
        if(typeof param === 'string'){
            checkIfUserExist = await this.prisma.user.findUnique({
                where : {
                    email : param
                }
            }); 
        }
        if(typeof param === 'number') {
            checkIfUserExist = await this.prisma.user.findUnique({
                where : {
                    id : param
                }
            }); 
        }

        if(!checkIfUserExist) {
            throw new NotFoundException('User not Found'); 
        }

        return checkIfUserExist; 
    }

    async createUser (user : Prisma.UserCreateInput) : Promise<User>{
        const {email} = user; 
        await this.checkIfUserExist(email); 
        const userCreated = await this.prisma.user.create({data : user}); 
        return userCreated; 
    }

    async getUsers() : Promise<User []>{
        return this.prisma.user.findMany(); 
    }

    async getUserWithId (id : number) : Promise<User> {
        return this.checkIfUserExist(id); 
    }

    async updateUserWithId (id : number, data:Prisma.UserUpdateInput) : Promise<User> {
        await this.checkIfUserExist(id); 
        const updatedUser = await this.prisma.user.update({
            where : {
                id
            }, 
            data : data
        }); 

        return updatedUser; 
    }

    async deleteUserWithId (id : number) : Promise<User> {
        await this.checkIfUserExist(id); 

        const deletedUser = await this.prisma.user.delete({
            where : {
                id
            }
        }); 

        return deletedUser; 
    }
}
