import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { RegisterUsersDto } from './dto/register-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Endpoint de login' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully login!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/register')
  @ApiOperation({ summary: 'Endpoint de registro' })
  @ApiResponse({ status: 200, description: 'Registro bem-sucedido' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUsersDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully register user!',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
