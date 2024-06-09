import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';


@Controller('user')
export class UserController {
    constructor(private userService : UserService){}

    @Post()
    createUser (@Body() data : Prisma.UserCreateInput) {
        return this.userService.createUser(data); 
    }

    @Get()
    findAllUsers () {
        return this.userService.getUsers(); 
    }

    @Get(':id') 
    findUserWithId (@Param('id', ParseIntPipe) id : number) {
        return this.userService.getUserWithId(id); 
    }

    @Patch(':id')
    updateUser (@Param('id', ParseIntPipe) id : number, @Body() user : Prisma.UserUpdateInput) {
        return this.userService.updateUserWithId(id, user); 
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id : number) {
        return this.userService.deleteUserWithId(id);
    }
}
