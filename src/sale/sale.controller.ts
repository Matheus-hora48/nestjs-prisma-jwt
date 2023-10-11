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
import { SaleService } from './sale.service';
import { Prisma } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { SaleFindDto } from './dto/find-sale.dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@ApiTags('venda')
@ApiBearerAuth()
@Controller('venda')
export class SaleController {
  constructor(private salesService: SaleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar todas vendas' })
  @ApiResponse({ status: 200, description: 'Todas vendas encontrados' })
  async index() {
    return { result: await this.salesService.findAll() };
  }

  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar todas vendas com apenas id_fili e numnota',
  })
  @ApiResponse({ status: 200, description: 'Todas vendas encontradas' })
  async selecionarVenda() {
    return await this.salesService.findAllSelected();
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar vendas por informações' })
  @ApiResponse({ status: 200, description: 'venda encontrada' })
  @ApiBody({ type: SaleFindDto })
  async buscarVenda(@Body() reqBody: SaleFindDto) {
    const { logusua, cnpj, codmuni, codfili, dtebegn, dateend } = reqBody;

    const where: Prisma.VendasFindManyArgs = {
      where: {
        datvend: {
          ...(dtebegn &&
            dateend && {
              gte: new Date(dtebegn),
              lte: new Date(dateend),
            }),
        },
        id_fili: { contains: cnpj || '' },

        venvend: logusua,
        cidade: codmuni,
        codfili: codfili,
      },
    };

    return { result: await this.salesService.findVendas(where) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar novo venda' })
  @ApiResponse({ status: 200, description: 'Venda enviada com sucesso' })
  @ApiBody({ type: CreateSaleDto })
  async enviarVenda(@Body() body: Prisma.VendasCreateInput) {
    return await this.salesService.createVenda(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar venda por ID' })
  @ApiResponse({ status: 200, description: 'Venda atualizada com sucesso' })
  @ApiBody({ type: UpdateSaleDto })
  async atualizarVenda(
    @Param('id') id: number,
    @Body() body: Prisma.VendasUpdateInput,
  ) {
    return await this.salesService.updateVenda(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar venda por ID' })
  @ApiResponse({ status: 200, description: 'Venda deletada com sucesso' })
  async deleteVenda(@Param('id') id: number) {
    return await this.salesService.deleteVenda(id);
  }
}
