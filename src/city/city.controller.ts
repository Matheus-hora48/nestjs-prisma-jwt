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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchCityDto } from './dto/search-city.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags('cidades')
@ApiBearerAuth()
@Controller('cidade')
export class CityController {
  constructor(private cidadeService: CityService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar todas cidades' })
  @ApiResponse({ status: 200, description: 'Todas cidades encontradas' })
  async index() {
    return { result: await this.cidadeService.findAll() };
  }

  @Get('selecionar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar todas cidades com apenas id_fili e codmuni',
  })
  @ApiResponse({ status: 200, description: 'Todas cidades encontradas' })
  async selecionarCidade() {
    return await this.cidadeService.findAllSelected();
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar cidade por CNPJ' })
  @ApiResponse({ status: 200, description: 'Cidade encontrada' })
  @ApiBody({ type: SearchCityDto })
  async buscarCidade(@Body() body) {
    const { cnpj } = body;
    return { result: await this.cidadeService.findCitiesByCnpj(cnpj) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar nova cidade' })
  @ApiResponse({ status: 200, description: 'Cidade enviada com sucesso' })
  @ApiBody({ type: CreateCityDto })
  async enviarCidade(@Body() body: Prisma.CidadeCreateInput) {
    return await this.cidadeService.createCity(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar cidade por ID' })
  @ApiResponse({ status: 200, description: 'Cidade atualizada com sucesso' })
  @ApiBody({ type: UpdateCityDto })
  async atualizarCidade(
    @Param('id') id: string,
    @Body() body: Prisma.CidadeUpdateInput,
  ) {
    return await this.cidadeService.updateCity(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar cidade por ID' })
  @ApiResponse({ status: 200, description: 'Cidade deletada com sucesso' })
  async deleteCidade(@Param('id') id: string) {
    return await this.cidadeService.deleteCity(id);
  }
}
