import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Users } from 'src/users/users.model';
import { ApiTags } from '@nestjs/swagger';
import { log } from 'console';

@ApiTags('auth')
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { cnpj, senhaHash } = loginDto;

    const users = await this.prismaService.users.findUnique({
      where: { cnpj },
    });

    if (!users) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(senhaHash, users.senhaHash);

    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      token: this.jwtService.sign({ cnpj }),
    };
  }

  async register(createDto: RegisterUsersDto): Promise<any> {
    const { cnpj } = createDto;

    const existingUser = await this.prismaService.users.findUnique({
      where: { cnpj },
    });

    if (existingUser) {
      throw new ConflictException('username already exists');
    }

    const createUser = new Users();
    createUser.cnpj = createDto.cnpj;
    createUser.empresa = createDto.empresa;
    createUser.senhaHash = await bcrypt.hash(createDto.senhaHash, 10);

    const user = await this.usersService.createUser(createUser);

    return {
      token: this.jwtService.sign({ cnpj: user.cnpj }),
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
