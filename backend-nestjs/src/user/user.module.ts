import { Module } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
