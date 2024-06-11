import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User} from '@prisma/client';
import * as bcrypt from 'bcryptjs'; 
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UserService {
    constructor (private prisma : PrismaService){}

    async findUser (param : string | number) : Promise<User>{
        let user : User | null = null; 
        if(typeof param === 'string'){
            user = await this.prisma.user.findUnique({
                where : {
                    email : param
                }
            }); 
        }
        if(typeof param === 'number') {
            user = await this.prisma.user.findUnique({
                where : {
                    id : param
                }
            }); 
        }
        return user; 
    }

    async createUser (data : Prisma.UserCreateInput) : Promise<User>{
        const {email} = data; 
        const user = await this.findUser(email); 
        if(user){
            throw new UnauthorizedException('User already exist')
        }
        // extract password and the other fields
        const {password, ...result} = data; 
        // encrypt the password
        const hashedPassword = bcrypt.hashSync(password, 10); 
        // save user with encrypted password in the database.
        const savedUser = await this.prisma.user.create({data : {...result, password : hashedPassword}}); 
        // generate a token and send it to the user
        delete savedUser.password; 
        // const token = jwt.sign(result, env.ACCESS_TOKEN_SECRET, {expiresIn : '24h'}); 
        // return the token
        return savedUser; 
    }

    async getUsers() : Promise<Partial<User>[]>{
        const users = await this.prisma.user.findMany({
            select : {
                email : true, 
                createdAt : true, 
                id : true,
                updatedAt : true,
                status : true, 
                password : false,
            }
        }); 
        return users
    }

    async getUserWithId (id : number) : Promise<User> {
        const user = await this.findUser(id); 
        if(!user){
            throw new NotFoundException('User not found'); 
        }
        delete user.password; 
        return user; 
    }

    async updateUserWithId (id : number, data:Prisma.UserUpdateInput) : Promise<User> {
        const user = await this.findUser(id); 
        if(!user){
            throw new NotFoundException('User not Found'); 
        }
        const updatedUser = await this.prisma.user.update({
            where : {
                id
            }, 
            data : data
        }); 

        delete updatedUser.password
        return updatedUser; 
    }

    async deleteUserWithId (id : number) : Promise<User> {
        const user = await this.findUser(id); 
        if(!user) {
            throw new NotFoundException('User not found'); 
        }
        const deletedUser = await this.prisma.user.delete({
            where : {
                id
            }
        }); 

        return deletedUser; 
    }
}
