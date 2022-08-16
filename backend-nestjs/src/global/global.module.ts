import { Global, Module } from '@nestjs/common';
import { DateScalar } from './date';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService, DateScalar],
    exports: [PrismaService],
})
export class GlobalModule {}
