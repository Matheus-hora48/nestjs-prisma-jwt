import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { SaleService } from './sale.service';
import { Prisma } from '@prisma/client';

@Controller('venda')
export class SaleController {
  constructor(private salesService: SaleService) {}

  @Get()
  async index() {
    return { result: await this.salesService.findAll() };
  }

  @Get('selecionar')
  async selecionarVenda() {
    return await this.salesService.findAllSelected();
  }

  @Post('buscar')
  async buscarVenda(@Body() reqBody: Prisma.VendasFindManyArgs) {
    return { result: await this.salesService.findVendas(reqBody) };
  }

  @Post('enviar')
  async enviarVenda(@Body() body: Prisma.VendasCreateInput) {
    return await this.salesService.createVenda(body);
  }

  @Put(':id')
  async atualizarVenda(@Param('id') id: number, @Body() body: Prisma.VendasUpdateInput) {
    return await this.salesService.updateVenda(id, body);
  }

  @Delete(':id')
  async deleteVenda(@Param('id') id: number) {
    return await this.salesService.deleteVenda(id);
  }
}
