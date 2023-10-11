import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@ApiTags('vendedor')
@ApiBearerAuth()
@Controller('vendedor')
export class SellersController {
  constructor(private vendedorService: SellersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar todos vendedores' })
  @ApiResponse({ status: 200, description: 'Todos vendedores encontrados' })
  async index() {
    return { result: await this.vendedorService.findAll() };
  }

  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar todos vendedores com apenas id_fili e codusua',
  })
  async selectVendedor() {
    return await this.vendedorService.findAllSelected();
  }

  @Post('search/sales')
  async searchSalesByVendedor(@Body() reqBody: Prisma.VendedoresFindManyArgs) {
    return { result: await this.vendedorService.findSalesByVendedor(reqBody) };
  }

  @Post('search/orcamento')
  async searchOrcamentoByVendedor(
    @Body() reqBody: Prisma.VendedoresFindManyArgs,
  ) {
    return {
      result: await this.vendedorService.findOrcamentoByVendedor(reqBody),
    };
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
  async updateVendedor(
    @Param('id') id: number,
    @Body() body: Prisma.VendedoresUpdateInput,
  ) {
    return await this.vendedorService.updateVendedor(id, body);
  }

  @Delete(':id')
  async deleteVendedor(@Param('id') id: number) {
    return await this.vendedorService.deleteVendedor(id);
  }
}
