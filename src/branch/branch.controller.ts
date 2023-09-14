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
import { Prisma } from '@prisma/client';
import { BranchService } from './branch.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('filiais')
@Controller('filial')
export class BranchController {
  constructor(private filialService: BranchService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async index() {
    return { result: await this.filialService.findAll() };
  }

  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  async selecionarFilial() {
    return await this.filialService.findAllSelected();
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  async buscarFilial(@Body() body) {
    const { cnpj } = body;
    return { result: await this.filialService.findFilialsByCnpj(cnpj) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  async enviarFilial(@Body() body: Prisma.FiliaisCreateInput) {
    return await this.filialService.createFilial(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async atualizarFilial(
    @Param('id') id: number,
    @Body() body: Prisma.FiliaisUpdateInput,
  ) {
    return await this.filialService.updateFilial(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteFilial(@Param('id') id: number) {
    return await this.filialService.deleteFilial(id);
  }
}
