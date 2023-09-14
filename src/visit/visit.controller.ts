import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { Prisma } from '@prisma/client';

@Controller('visita')
export class VisitController {
  constructor(private visitaService: VisitService) {}

  @Get()
  async index() {
    return { result: await this.visitaService.findAll() };
  }

  @Get('select')
  async selectVisita() {
    return await this.visitaService.findAllSelected();
  }

  @Post('search')
  async searchVisitaByParams(@Body() reqBody: Prisma.VisitaFindManyArgs) {
    return { result: await this.visitaService.findVisitasByParams(reqBody) };
  }

  @Post('search/cnpj')
  async searchVisitaByCnpj(@Body('cnpj') cnpj: string) {
    return { result: await this.visitaService.findVisitaByCnpj(cnpj) };
  }

  @Post('create')
  async createVisita(@Body() body: Prisma.VisitaCreateInput) {
    return await this.visitaService.createVisita(body);
  }

  @Put(':id')
  async updateVisita(
    @Param('id') id: number,
    @Body() body: Prisma.VisitaUpdateInput,
  ) {
    return await this.visitaService.updateVisita(id, body);
  }

  @Delete(':id')
  async deleteVisita(@Param('id') id: number) {
    return await this.visitaService.deleteVisita(id);
  }
}
