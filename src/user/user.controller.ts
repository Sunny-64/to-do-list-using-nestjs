import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';


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

    @Get('token')
    @UseGuards(AuthGuard)
    getUserWithToken (@Req() req : Request) {
        return this.userService.getUserWithId(req['user'].id); 
    }

    @Get(':id') 
    @UseGuards(AuthGuard)
    findUserWithId (@Param('id', ParseIntPipe) id : number) {
        return this.userService.getUserWithId(id); 
    }

  
    @Patch()
    @UseGuards(AuthGuard)
    updateUser (@Req() req : Request, @Body() user : Prisma.UserUpdateInput) {
        return this.userService.updateUserWithId(req['user'].id, user); 
    }

    @Delete()
    @UseGuards(AuthGuard)
    deleteUser(@Req() req : Request) {
        return this.userService.deleteUserWithId(req['user'].id);
    }
}
