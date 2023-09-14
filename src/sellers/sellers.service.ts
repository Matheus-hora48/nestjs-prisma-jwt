import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { SellersService } from './sellers.controller';
import { Prisma } from '@prisma/client';

@Controller('vendor')
export class SellersController {
  constructor(private vendedorService: SellersService) {}

  @Get()
  async index() {
    return { result: await this.vendedorService.findAll() };
  }

  @Get('select')
  async selectVendedor() {
    return await this.vendedorService.findAllSelected();
  }

  @Post('search/sales')
  async searchSalesByVendedor(@Body() reqBody: Prisma.VendedoresFindManyArgs) {
    return { result: await this.vendedorService.findSalesByVendedor(reqBody) };
  }

  @Post('search/orcamento')
  async searchOrcamentoByVendedor(@Body() reqBody: Prisma.VendedoresFindManyArgs) {
    return { result: await this.vendedorService.findOrcamentoByVendedor(reqBody) };
  }

  @Post('search')
  async searchVendedorByCnpj(@Body('cnpj') cnpj: string) {
    return { result: await this.vendedorService.findVendedorByCnpj(cnpj) };
  }

  @Post('create')
  async createVendedor(@Body() body: Prisma.VendedoresCreateInput) {
    return await this.vendedorService.createVendedor(body);
  }

  @Put(':id')
  async updateVendedor(@Param('id') id: number, @Body() body: Prisma.VendedoresUpdateInput) {
    return await this.vendedorService.updateVendedor(id, body);
  }

  @Delete(':id')
  async deleteVendedor(@Param('id') id: number) {
    return await this.vendedorService.deleteVendedor(id);
  }
}
