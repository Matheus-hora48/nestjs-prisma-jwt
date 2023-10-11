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
import { ProspectService } from './prospect.service';
import { Prisma } from '@prisma/client';
import { ProspectFindDto } from './dto/find-prospect.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';

@ApiTags('prospect')
@ApiBearerAuth()
@Controller('prospect')
export class ProspectController {
  constructor(private prospectService: ProspectService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar todos prospects' })
  @ApiResponse({ status: 200, description: 'Todos prospects encontrados' })
  async index() {
    return { result: await this.prospectService.findAll() };
  }

  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar todos prospects com apenas id_fili e codmuni',
  })
  @ApiResponse({ status: 200, description: 'Todos prospects encontradas' })
  async selecionarProspects() {
    return await this.prospectService.findAllSelected();
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar prospects por informações' })
  @ApiResponse({ status: 200, description: 'prospect encontrado' })
  @ApiBody({ type: ProspectFindDto })
  async buscarProspect(@Body() reqBody: ProspectFindDto) {
    const { logusua, cnpj, codmuni, codfili, dtebegn, dateend } = reqBody;
    const where: Prisma.ProspectFindManyArgs = {
      where: {
        cadparc: {
          ...(dtebegn &&
            dateend && {
              gte: new Date(dtebegn),
              lte: new Date(dateend),
            }),
        },
        id_fili: { contains: cnpj || '' },

        usuparc: logusua,
        codcida: codmuni,
        coddomi: codfili,
      },
    };

    return { result: await this.prospectService.findProspects(where) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar novo prospect' })
  @ApiResponse({ status: 200, description: 'Prospect enviado com sucesso' })
  @ApiBody({ type: CreateProspectDto })
  async enviarProspect(@Body() body: Prisma.ProspectCreateInput) {
    return await this.prospectService.createProspect(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar prospect por ID' })
  @ApiResponse({ status: 200, description: 'Prospect atualizada com sucesso' })
  @ApiBody({ type: UpdateProspectDto })
  async atualizarProspect(
    @Param('id') id: number,
    @Body() body: Prisma.ProspectUpdateInput,
  ) {
    return await this.prospectService.updateProspect(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar prospect por ID' })
  @ApiResponse({ status: 200, description: 'Prospect deletada com sucesso' })
  async deleteProspect(@Param('id') id: number) {
    return await this.prospectService.deleteProspect(id);
  }
}
