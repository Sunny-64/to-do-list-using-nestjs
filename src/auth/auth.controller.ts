import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SignInDto } from '../dto/signInDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private authService : AuthService){}
    @Post('login')
    async login (@Body() signInDto : SignInDto) {
        return this.authService.login(signInDto);
    }

}
