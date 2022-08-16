import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { PrismaService } from 'src/global/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [QuestionsService, QuestionsResolver],
})
export class QuestionsModule {}
