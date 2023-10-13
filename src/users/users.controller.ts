import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';

@ApiTags('usuario')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Busca todos usuários do banco' })
  @ApiResponse({ status: 200, description: 'Usuários encontrados' })
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Dados com sucesso!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Erro do Servidor Interno!',
      });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Busca um usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getUserById(@Param('id') id: number, @Res() response: Response) {
    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        return response.status(404).json({
          status: 'Não encontrado',
          message: 'Usuário não encontrado',
        });
      }

      return response.status(200).json({
        status: 'Ok!',
        message: 'Usuário encontrado',
        result: user,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Erro do Servidor Interno!',
        message: 'Erro do Servidor Interno!',
      });
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualiza um usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async updateUser(
    @Param('id') id: number,
    @Body() data: Partial<Users>,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const updatedUser = await this.userService.updateUser(id, data);

      if (!updatedUser) {
        return response.status(404).json({
          status: 'Não encontrado',
          message: 'Usuário não encontrado',
        });
      }

      return response.status(200).json({
        status: 'Ok!',
        message: 'Usuário atualizado com sucesso',
        result: updatedUser,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Erro do Servidor Interno!',
        message: 'Erro do Servidor Interno!',
      });
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Exclui um usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async deleteUser(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const deletedUser = await this.userService.deleteUser(id);

      if (!deletedUser) {
        return response.status(404).json({
          status: 'Não encontrado',
          message: 'Usuário não encontrado',
        });
      }

      return response.status(200).json({
        status: 'Ok!',
        message: 'Usuário excluído com sucesso',
        result: deletedUser,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Erro do Servidor Interno!',
        message: 'Erro do Servidor Interno!',
      });
    }
  }
}
