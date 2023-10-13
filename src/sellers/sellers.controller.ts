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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { SallersFindDto } from './dto/find-sallers.dto';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

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
  @ApiResponse({ status: 200, description: 'vendedor encontrado' })
  async selectVendedor() {
    return await this.vendedorService.findAllSelected();
  }

  @Post('buscar/venda')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar vendedores junto com venda por informações',
  })
  @ApiResponse({ status: 200, description: 'vendedor encontrado' })
  async searchSalesBySeller(@Body() reqBody: SallersFindDto) {
    const { logusua, cnpj, codmuni, codfili, dtebegn, dateend } = reqBody;

    return {
      result: await this.vendedorService.findSalesBySeller(
        logusua,
        cnpj,
        codmuni,
        codfili,
        dtebegn,
        dateend,
      ),
    };
  }

  @Post('buscar/orcamento')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar vendedores junto com orcamento por informações',
  })
  @ApiResponse({ status: 200, description: 'vendedor encontrado' })
  async searchOrcamentoBySeller(@Body() reqBody: SallersFindDto) {
    const { logusua, cnpj, codmuni, codfili, dtebegn, dateend } = reqBody;
    return {
      result: await this.vendedorService.findOrcamentoBySeller(
        logusua,
        cnpj,
        codmuni,
        codfili,
        dtebegn,
        dateend,
      ),
    };
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar vendedor por CNPJ' })
  @ApiResponse({ status: 200, description: 'vendedor encontrada' })
  async searchVendedorByCnpj(@Body('cnpj') cnpj: string) {
    return { result: await this.vendedorService.findVendedorByCnpj(cnpj) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar novo vendedor' })
  @ApiResponse({ status: 200, description: 'Vendedor enviado com sucesso' })
  @ApiBody({ type: CreateSellerDto })
  async createVendedor(@Body() body: Prisma.VendedoresCreateInput) {
    return await this.vendedorService.createVendedor(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar vendedor por ID' })
  @ApiResponse({ status: 200, description: 'Vendedor atualizado com sucesso' })
  @ApiBody({ type: UpdateSellerDto })
  async updateVendedor(
    @Param('id') id: number,
    @Body() body: Prisma.VendedoresUpdateInput,
  ) {
    return await this.vendedorService.updateVendedor(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar vendedor por ID' })
  @ApiResponse({ status: 200, description: 'Vendedor deletado com sucesso' })
  async deleteVendedor(@Param('id') id: number) {
    return await this.vendedorService.deleteVendedor(id);
  }
}
