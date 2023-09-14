import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProspectService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.prospect.findMany({
      select: {
        cadparc: true,
        coddomi: true,
        id_fili: true,
        nomparc: true,
        sobparc: true,
        cgcende: true,
        fonende: true,
        codparc: true,
        codcida: true,
        usuparc: true,
        is_leds: true,
        is_parc: true,
      },
    });
  }

  async findAllSelected() {
    return this.prisma.prospect.findMany({
      select: {
        id: true,
        codparc: true,
        id_fili: true,
        updated_at: true,
      },
    });
  }

  async findProspects(reqBody: Prisma.ProspectFindManyArgs) {
    return this.prisma.prospect.findMany(reqBody);
  }

  async createProspect(prospectData: Prisma.ProspectCreateInput) {
    try {
      const novoProspect = await this.prisma.prospect.create({
        data: prospectData,
      });
      return novoProspect;
    } catch (e) {
      throw new BadRequestException({ errors: e });
    }
  }

  async updateProspect(id: number, prospectData: Prisma.ProspectUpdateInput) {
    try {
      const prospect = await this.prisma.prospect.findUnique({
        where: {
          id,
        },
      });
      if (!prospect) {
        throw new NotFoundException('Prospect não encontrado');
      }
      await this.prisma.prospect.update({
        where: {
          id,
        },
        data: prospectData,
      });
      return prospect;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteProspect(id: number) {
    try {
      const prospect = await this.prisma.prospect.findUnique({
        where: {
          id,
        },
      });
      if (!prospect) {
        throw new NotFoundException('Prospect não encontrado');
      }
      await this.prisma.prospect.delete({
        where: {
          id,
        },
      });
      return { message: 'Prospect deletado' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
