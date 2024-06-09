import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeToServer(): string {
    return 'Welcome to to-do-list api';
  }
}
