import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { env } from 'process';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { SignInDto } from '../dto/signInDto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor (
        private userService : UserService,
        private jwtService : JwtService
    ){}

    async login (signInDto : SignInDto){
        const user = await this.userService.findUser(signInDto.email); 
        if(!user){
            throw new NotFoundException('User not found'); 
        }

        const checkPassword = bcrypt.compareSync(signInDto.password, user?.password); 

        if(!checkPassword){
            throw new UnauthorizedException('Incorrect Email or Password'); 
        }

        // extract the password
        const {password, ...result} = user; 
        // generate a new token
        const token = await this.jwtService.signAsync(result); 
        // return the token
        return {token};    
    }
}
