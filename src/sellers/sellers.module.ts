import { Module } from '@nestjs/common';
import { SellersController } from './sellers.service';
import { SellersService } from './sellers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SellersController],
  providers: [SellersService, PrismaService]
})
export class SellersModule {}
