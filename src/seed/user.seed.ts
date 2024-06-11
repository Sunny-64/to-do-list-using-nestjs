// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { USERS } from '../constants';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  for (const userData of USERS) {
    try {
      const checkUser = await userService.findUser(userData?.email);
      if (!checkUser) {
        await userService.createUser({
          email: userData.email,
          password: userData.email,
        });
      } else {
        console.log('User already exists');
      }
    } catch (error) {
      console.error(`Failed to create user ${userData.email}:`, error.message);
    }
  }

  await app.close();
}

bootstrap();
