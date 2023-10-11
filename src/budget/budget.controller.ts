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
import { BudgetService } from './budget.service';
import { Prisma } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { BudgetFindDto } from './dto/find-budget.dto';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@ApiTags('orcamento')
@ApiBearerAuth()
@Controller('orcamento')
export class BudgetController {
  constructor(private salesService: BudgetService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar todas Orcamentos' })
  @ApiResponse({ status: 200, description: 'Todas Orcamentos encontrados' })
  async index() {
    return { result: await this.salesService.findAll() };
  }
  updateOrcamento;
  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar todas orcamentos com apenas id_fili e numnota',
  })
  @ApiResponse({ status: 200, description: 'Todos orcamentos encontradas' })
  async selecionarOrcamento() {
    return await this.salesService.findAllSelected();
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar orcamentos por informações' })
  @ApiResponse({ status: 200, description: 'Orcamento encontrada' })
  @ApiBody({ type: BudgetFindDto })
  async buscarOrcamento(@Body() reqBody: BudgetFindDto) {
    const { logusua, cnpj, codmuni, codfili, dtebegn, dateend } = reqBody;

    const where: Prisma.OrcamentoFindManyArgs = {
      where: {
        datpedi: {
          ...(dtebegn &&
            dateend && {
              gte: new Date(dtebegn),
              lte: new Date(dateend),
            }),
        },
        id_fili: { contains: cnpj || '' },

        codusua: logusua,
        cidade: codmuni,
        codfili: codfili,
      },
    };

    return { result: await this.salesService.findOrcamento(where) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar novo orcamentos' })
  @ApiResponse({ status: 200, description: 'Orcamento enviada com sucesso' })
  @ApiBody({ type: CreateBudgetDto })
  async enviarOrcamento(@Body() body: Prisma.OrcamentoCreateInput) {
    return await this.salesService.createOrcamento(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar orcamentos por ID' })
  @ApiResponse({ status: 200, description: 'Orcamento atualizada com sucesso' })
  @ApiBody({ type: UpdateBudgetDto })
  async atualizarOrcamento(
    @Param('id') id: number,
    @Body() body: Prisma.OrcamentoUpdateInput,
  ) {
    return await this.salesService.updateOrcamento(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar orcamentos por ID' })
  @ApiResponse({ status: 200, description: 'Orcamento deletada com sucesso' })
  async deleteOrcamento(@Param('id') id: number) {
    return await this.salesService.deleteOrcamento(id);
  }
}
