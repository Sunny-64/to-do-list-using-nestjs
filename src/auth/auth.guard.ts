import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'process';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService : JwtService, private userService : UserService){}

    private extractTokenFromHeader (request : Request) {
        if(!request.headers['authorization']) return undefined; 
        const [type, token] = request.headers['authorization'].split(' ') ?? []; 
        return type === 'Bearer' ? token : undefined; 
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(); 
        const token = this.extractTokenFromHeader(request); 
        if(!token) {
            throw new UnauthorizedException(); 
        }

        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret : env.ACCESS_TOKEN_SECRET
            }); 
            const isValidUser = await this.userService.findUser(payload.id); 
            if(!isValidUser) {
                throw new UnauthorizedException(); 
            }
            request['user'] = payload; 
        }
        catch(err){
            throw new UnauthorizedException(); 
        }
        return true; 
    }
}