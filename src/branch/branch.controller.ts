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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { SearchBranchDto } from './dto/search-branch.dto';

@ApiTags('filiais')
@ApiBearerAuth()
@Controller('filial')
export class BranchController {
  constructor(private filialService: BranchService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar todas filiais' })
  @ApiResponse({ status: 200, description: 'Todas filiais encontradas' })
  async index() {
    return { result: await this.filialService.findAll() };
  }

  @Post('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar filial por CNPJ' })
  @ApiResponse({ status: 200, description: 'Filial encontrada' })
  @ApiBody({ type: SearchBranchDto })
  async buscarFilial(@Body() body) {
    const { cnpj } = body;
    return { result: await this.filialService.findFilialsByCnpj(cnpj) };
  }

  @Post('enviar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar nova filial' })
  @ApiResponse({ status: 200, description: 'Filial enviada com sucesso' })
  @ApiBody({ type: CreateBranchDto })
  async enviarFilial(@Body() body: Prisma.FiliaisCreateInput) {
    return await this.filialService.createFilial(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar filial por ID' })
  @ApiResponse({ status: 200, description: 'Filial atualizada com sucesso' })
  @ApiBody({ type: UpdateBranchDto })
  async atualizarFilial(
    @Param('id') id: string,
    @Body() body: Prisma.FiliaisUpdateInput,
  ) {
    return await this.filialService.updateFilial(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar filial por ID' })
  @ApiResponse({ status: 200, description: 'Filial deletada com sucesso' })
  async deleteFilial(@Param('id') id: string) {
    return await this.filialService.deleteFilial(id);
  }
}
