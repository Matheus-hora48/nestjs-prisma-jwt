import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma, Visita } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VisitService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.visita.findMany();
  }

  async findAllSelected() {
    return this.prisma.visita.findMany({
      select: {
        id: true,
        codvist: true,
        id_fili: true,
        updated_at: true,
      },
    });
  }

  async findVisitasByParams(reqBody: Prisma.VisitaFindManyArgs) {
    return this.prisma.visita.findMany(reqBody);
  }

  async findVisitaByCnpj(cnpj: string) {
    return this.prisma.visita.findMany({
      where: {
        id_fili: {
          startsWith: cnpj,
        },
      },
      select: {
        codvist: true,
        datvist: true,
        empvist: true,
        resvist: true,
        docvist: true,
        fonvist: true,
        locvist: true,
        usuvist: true,
        dtrvist: true,
        is_leds: true,
        dthleds: true,
        obsleds: true,
        usuleds: true,
        is_parc: true,
        dthparc: true,
        obsparc: true,
        usuparc: true,
        codcida: true,
      },
    });
  }

  async createVisita(visitaData: Prisma.VisitaCreateInput) {
    try {
      const novaVisita = await this.prisma.visita.create({
        data: visitaData,
      });
      return novaVisita;
    } catch (e) {
      throw new BadRequestException({ errors: e });
    }
  }

  async updateVisita(id: number, visitaData: Prisma.VisitaUpdateInput) {
    try {
      const visita = await this.prisma.visita.findUnique({
        where: {
          id,
        },
      });
      if (!visita) {
        throw new NotFoundException('Visita não encontrada');
      }
      await this.prisma.visita.update({
        where: {
          id,
        },
        data: visitaData,
      });
      return visita;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteVisita(id: number) {
    try {
      const visita = await this.prisma.visita.findUnique({
        where: {
          id,
        },
      });
      if (!visita) {
        throw new NotFoundException('Visita não encontrada');
      }
      await this.prisma.visita.delete({
        where: {
          id,
        },
      });
      return { message: 'Visita deletada' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
