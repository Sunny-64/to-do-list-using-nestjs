import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../db/prisma.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports : [
    UserModule, 
    JwtModule.register({
      global: true,
      secret: env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [PrismaService, AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
