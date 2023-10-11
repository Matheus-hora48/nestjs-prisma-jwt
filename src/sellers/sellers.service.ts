import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vendedores.findMany();
  }

  async findAllSelected() {
    return this.prisma.vendedores.findMany({
      select: {
        id: true,
        codusua: true,
        id_fili: true,
        updated_at: true,
      },
    });
  }

  async findSalesByVendedor(reqBody: Prisma.VendedoresFindManyArgs) {
    return this.prisma.vendedores.findMany(reqBody);
  }

  async findOrcamentoByVendedor(reqBody: Prisma.VendedoresFindManyArgs) {
    return this.prisma.vendedores.findMany(reqBody);
  }

  async findVendedorByCnpj(cnpj: string) {
    return this.prisma.vendedores.findMany({
      where: {
        id_fili: {
          startsWith: cnpj,
        },
      },
      select: {
        codusua: true,
        logusua: true,
        id_fili: true,
      },
    });
  }

  async createVendedor(vendedorData: Prisma.VendedoresCreateInput) {
    try {
      const newVendedor = await this.prisma.vendedores.create({
        data: vendedorData,
      });
      return newVendedor;
    } catch (e) {
      throw new BadRequestException({ errors: e });
    }
  }

  async updateVendedor(id: number, vendedorData: Prisma.VendedoresUpdateInput) {
    try {
      const vendedor = await this.prisma.vendedores.findUnique({
        where: {
          id,
        },
      });
      if (!vendedor) {
        throw new NotFoundException('Vendedor não encontrado');
      }
      await this.prisma.vendedores.update({
        where: {
          id,
        },
        data: vendedorData,
      });
      return vendedor;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteVendedor(id: number) {
    try {
      const vendedor = await this.prisma.vendedores.findUnique({
        where: {
          id,
        },
      });
      if (!vendedor) {
        throw new NotFoundException('Vendedor não encontrado');
      }
      await this.prisma.vendedores.delete({
        where: {
          id,
        },
      });
      return { message: 'Vendedor deletado' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
