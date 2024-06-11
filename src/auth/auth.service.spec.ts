import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../db/prisma.service';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // make sure to seed the database first
  // it('should return token', async () => {
  //     const token = await service.login({email : 'helly@gmail.com', password : '1234'}); 
  //     expect(token?.token.length).toBeGreaterThan(0)
  // }) 
});
