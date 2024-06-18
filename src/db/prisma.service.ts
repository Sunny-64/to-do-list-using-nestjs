import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('db connected');
    } catch (err) {
      console.log('Failed to connect to db : ');
      console.log(err);
    }
  }
}
