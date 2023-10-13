import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.users.findUnique({
      where: {
        cnpj: data.cnpj,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    return this.prisma.users.create({
      data,
    });
  }
  async getUserById(id: number): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, data: Partial<Users>): Promise<Users | null> {
    return this.prisma.users.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<Users | null> {
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
