import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { PrismaService } from 'src/prisma.service';
import { VisitController } from './visit.controller';

@Module({
  controllers: [VisitController],
  providers: [VisitService, PrismaService],
})
export class VisitModule {}
