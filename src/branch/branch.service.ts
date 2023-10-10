import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.filiais.findMany({});
  }

  async findFilialsByCnpj(cnpj: string) {
    return this.prisma.filiais.findMany({
      select: {
        coddomi: true,
        cnpfili: true,
        id_fili: true,
      },
      where: {
        id_fili: {
          contains: cnpj,
        },
      },
    });
  }

  async createFilial(filialData: Prisma.FiliaisCreateInput) {
    try {
      const novaFilial = await this.prisma.filiais.create({
        data: filialData,
      });
      const { coddomi, cnpfili, id_fili } = novaFilial;
      return { coddomi, cnpfili, id_fili };
    } catch (e) {
      throw new BadRequestException({ errors: e });
    }
  }

  async updateFilial(id: string, filialData: Prisma.FiliaisUpdateInput) {
    try {
      const filialId = parseInt(id, 10);

      if (isNaN(filialId)) {
        throw new BadRequestException('O ID deve ser um número.');
      }
      const filial = await this.prisma.filiais.findUnique({
        where: {
          id: filialId,
        },
      });
      if (!filial) {
        throw new NotFoundException('Filial não encontrada');
      }
      await this.prisma.filiais.update({
        where: {
          id: filialId,
        },
        data: filialData,
      });
      return filial;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteFilial(id: string) {
    try {
      const filialId = parseInt(id, 10);

      if (isNaN(filialId)) {
        throw new BadRequestException('O ID deve ser um número.');
      }

      const filial = await this.prisma.filiais.findUnique({
        where: {
          id: filialId,
        },
      });

      if (!filial) {
        throw new NotFoundException('Filial não encontrada');
      }

      await this.prisma.filiais.delete({
        where: {
          id: filialId,
        },
      });

      return { message: 'Filial deletada' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
