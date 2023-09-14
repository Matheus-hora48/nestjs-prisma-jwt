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
import { CityService } from './city.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cidades')
@Controller('cidade')
export class CityController {
  constructor(private cidadeService: CityService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async index() {
    return { result: await this.cidadeService.findAll() };
  }

  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  async selecionarCidade() {
    return await this.cidadeService.findAllSelected();
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  async buscarCidade(@Body() body) {
    const { cnpj } = body;
    return { result: await this.cidadeService.findCitiesByCnpj(cnpj) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  async enviarCidade(@Body() body: Prisma.CidadeCreateInput) {
    return await this.cidadeService.createCity(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async atualizarCidade(
    @Param('id') id: number,
    @Body() body: Prisma.CidadeUpdateInput,
  ) {
    return await this.cidadeService.updateCity(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCidade(@Param('id') id: number) {
    return await this.cidadeService.deleteCity(id);
  }
}
