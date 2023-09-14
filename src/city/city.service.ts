import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, Cidade } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  @ApiProperty()
  async findAll() {
    return this.prisma.cidade.findMany({
      select: {
        id: true,
        codmuni: true,
        uf_muni: true,
        id_fili: true,
        nommuni: true,
      },
    });
  }

  async findAllSelected() {
    return this.prisma.cidade.findMany({
      select: {
        id: true,
        codmuni: true,
        id_fili: true,
        updated_at: true,
      },
    });
  }

  async findCitiesByCnpj(cnpj: string) {
    return this.prisma.cidade.findMany({
      select: {
        codmuni: true,
        uf_muni: true,
        id_fili: true,
        nommuni: true,
      },
      where: {
        id_fili: {
          contains: cnpj,
        },
      },
    });
  }

  async createCity(cityData: Prisma.CidadeCreateInput) {
    try {
      const novaCidade = await this.prisma.cidade.create({
        data: cityData,
      });
      const { codmuni, uf_muni, nommuni, id_fili } = novaCidade;
      return { codmuni, uf_muni, nommuni, id_fili };
    } catch (e) {
      throw new BadRequestException({ errors: e });
    }
  }

  async updateCity(id: number, cityData: Prisma.CidadeUpdateInput) {
    try {
      const cidade = await this.prisma.cidade.findUnique({
        where: {
          id,
        },
      });
      if (!cidade) {
        throw new NotFoundException('Cidade não encontrada');
      }
      await this.prisma.cidade.update({
        where: {
          id,
        },
        data: cityData,
      });
      return cidade;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteCity(id: number) {
    try {
      const cidade = await this.prisma.cidade.findUnique({
        where: {
          id,
        },
      });

      if (!cidade) {
        throw new NotFoundException('Cidade não encontrada');
      }

      await this.prisma.cidade.delete({
        where: {
          id,
        },
      });
      return { message: 'Cidade deletada' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
