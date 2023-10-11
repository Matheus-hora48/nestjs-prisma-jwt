import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vendas.findMany({
      select: {
        numnota: true,
        servend: true,
        codfili: true,
        id_fili: true,
        datvend: true,
        codparc: true,
        venvend: true,
        vlrliqu: true,
        vlrnota: true,
        nomparc: true,
        staorca: true,
        cidade: true,
        produtos: true,
      },
    });
  }

  async findAllSelected() {
    return this.prisma.vendas.findMany({
      select: {
        id: true,
        numnota: true,
        id_fili: true,
        updated_at: true,
      },
    });
  }

  async findVendas(reqBody: Prisma.VendasFindManyArgs) {
    return this.prisma.vendas.findMany(reqBody);
  }

  async createVenda(vendaData: Prisma.VendasCreateInput) {
    vendaData.datvend = new Date(vendaData.datvend);
    try {
      const novaVenda = await this.prisma.vendas.create({
        data: vendaData,
      });
      return novaVenda;
    } catch (e) {
      throw new BadRequestException({ errors: e });
    }
  }

  async updateVenda(id: number, vendaData: Prisma.VendasUpdateInput) {
    try {
      const venda = await this.prisma.vendas.findUnique({
        where: {
          id,
        },
      });
      if (!venda) {
        throw new NotFoundException('Venda não encontrada');
      }
      await this.prisma.vendas.update({
        where: {
          id,
        },
        data: vendaData,
      });
      return venda;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteVenda(id: number) {
    try {
      const venda = await this.prisma.vendas.findUnique({
        where: {
          id,
        },
      });
      if (!venda) {
        throw new NotFoundException('Venda não encontrada');
      }
      await this.prisma.vendas.delete({
        where: {
          id,
        },
      });
      return { message: 'Venda deletada' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
