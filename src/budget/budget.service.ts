import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.orcamento.findMany({});
  }

  async findAllSelected() {
    return this.prisma.orcamento.findMany({
      select: {
        id: true,
        codorca: true,
        id_fili: true,
        updated_at: true,
      },
    });
  }

  async findOrcamento(reqBody: Prisma.OrcamentoFindManyArgs) {
    return this.prisma.orcamento.findMany(reqBody);
  }

  async createOrcamento(oracamentoData: Prisma.OrcamentoCreateInput) {
    oracamentoData.datpedi = new Date(oracamentoData.datpedi);
    try {
      const novoOrcamento = await this.prisma.orcamento.create({
        data: oracamentoData,
      });
      console.log(novoOrcamento);

      return novoOrcamento;
    } catch (e) {
      console.log(e);

      throw new BadRequestException({ errors: e });
    }
  }

  async updateOrcamento(
    id: number,
    orcamentoData: Prisma.OrcamentoUpdateInput,
  ) {
    try {
      const orcamento = await this.prisma.orcamento.findUnique({
        where: {
          id,
        },
      });
      if (!orcamento) {
        throw new NotFoundException('Orcamento não encontrado');
      }
      await this.prisma.orcamento.update({
        where: {
          id,
        },
        data: orcamentoData,
      });
      return orcamento;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteOrcamento(id: number) {
    try {
      const orcamento = await this.prisma.orcamento.findUnique({
        where: {
          id,
        },
      });
      if (!orcamento) {
        throw new NotFoundException('Orcamento não encontrado');
      }
      await this.prisma.orcamento.delete({
        where: {
          id,
        },
      });
      return { message: 'Orcamento deletado' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
