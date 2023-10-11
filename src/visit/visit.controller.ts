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
import { VisitService } from './visit.service';
import { Prisma } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { VisitFindDto } from './dto/find-visit.dto';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitFindCnpjDto } from './dto/find-cnpj-visit';

@ApiTags('visita')
@ApiBearerAuth()
@Controller('visita')
export class VisitController {
  constructor(private visitaService: VisitService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar todas visitas' })
  @ApiResponse({ status: 200, description: 'Todas visitas encontradas' })
  async index() {
    return { result: await this.visitaService.findAll() };
  }

  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar todas visitas com apenas id_fili e codvist',
  })
  async selectVisita() {
    return await this.visitaService.findAllSelected();
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar visitas por informações' })
  @ApiResponse({ status: 200, description: 'Visitas encontrado' })
  @ApiBody({ type: VisitFindDto })
  async searchVisitaByParams(@Body() reqBody: VisitFindDto) {
    const { logusua, cnpj, codmuni, codfili, dtebegn, dateend } = reqBody;
    const where: Prisma.VisitaFindManyArgs = {
      where: {
        datvist: {
          ...(dtebegn &&
            dateend && {
              gte: new Date(dtebegn),
              lte: new Date(dateend),
            }),
        },
        id_fili: { contains: cnpj || '' },

        usuparc: logusua,
        codcida: codmuni,
        filvist: codfili,
      },
    };
    return { result: await this.visitaService.findVisitasByParams(where) };
  }

  @Post('buscar/cnpj')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar visitas por cnpj' })
  @ApiResponse({ status: 200, description: 'Visitas encontrado' })
  @ApiBody({ type: VisitFindCnpjDto })
  async searchVisitaByCnpj(@Body('cnpj') cnpj: string) {
    return { result: await this.visitaService.findVisitaByCnpj(cnpj) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar novo visita' })
  @ApiResponse({ status: 200, description: 'Visita enviado com sucesso' })
  @ApiBody({ type: CreateVisitDto })
  async createVisita(@Body() body: Prisma.VisitaCreateInput) {
    return await this.visitaService.createVisita(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar visita por ID' })
  @ApiResponse({ status: 200, description: 'Visita atualizada com sucesso' })
  @ApiBody({ type: UpdateVisitDto })
  async updateVisita(
    @Param('id') id: number,
    @Body() body: Prisma.VisitaUpdateInput,
  ) {
    return await this.visitaService.updateVisita(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar visita por ID' })
  @ApiResponse({ status: 200, description: 'Visita deletada com sucesso' })
  async deleteVisita(@Param('id') id: number) {
    return await this.visitaService.deleteVisita(id);
  }
}
