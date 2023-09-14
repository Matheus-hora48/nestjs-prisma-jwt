import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProspectService } from './prospect.service';
import { Prisma } from '@prisma/client';

@Controller('prospect')
export class ProspectController {
  constructor(private prospectService: ProspectService) {}

  @Get()
  async index() {
    return { result: await this.prospectService.findAll() };
  }

  @Get('selecionar')
  async selecionarProspects() {
    return await this.prospectService.findAllSelected();
  }

  @Post('buscar')
  async buscarProspect(@Body() reqBody: Prisma.ProspectFindManyArgs) {
    return { result: await this.prospectService.findProspects(reqBody) };
  }

  @Post('enviar')
  async enviarProspect(@Body() body: Prisma.ProspectCreateInput) {
    return await this.prospectService.createProspect(body);
  }

  @Put(':id')
  async atualizarProspect(@Param('id') id: number, @Body() body: Prisma.ProspectUpdateInput) {
    return await this.prospectService.updateProspect(id, body);
  }

  @Delete(':id')
  async deleteProspect(@Param('id') id: number) {
    return await this.prospectService.deleteProspect(id);
  }
}
