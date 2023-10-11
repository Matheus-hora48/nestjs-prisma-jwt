import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, Cidade } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

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
      return novaCidade;
    } catch (e) {
      throw new BadRequestException({ errors: e });
    }
  }

  async updateCity(id: string, cityData: Prisma.CidadeUpdateInput) {
    try {
      const filialId = parseInt(id, 10);

      if (isNaN(filialId)) {
        throw new BadRequestException('O ID deve ser um número.');
      }
      const cidade = await this.prisma.cidade.findUnique({
        where: {
          id: filialId,
        },
      });
      if (!cidade) {
        throw new NotFoundException('Cidade não encontrada');
      }
      await this.prisma.cidade.update({
        where: {
          id: filialId,
        },
        data: cityData,
      });
      return cidade;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteCity(id: string) {
    try {
      const filialId = parseInt(id, 10);

      if (isNaN(filialId)) {
        throw new BadRequestException('O ID deve ser um número.');
      }
      const cidade = await this.prisma.cidade.findUnique({
        where: {
          id: filialId,
        },
      });

      if (!cidade) {
        throw new NotFoundException('Cidade não encontrada');
      }

      await this.prisma.cidade.delete({
        where: {
          id: filialId,
        },
      });
      return { message: 'Cidade deletada' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
