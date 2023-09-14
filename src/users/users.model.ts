import { Prisma } from '@prisma/client';

export class Users implements Prisma.UsersCreateInput {
  cnpj: string;
  senhaHash: string;
  empresa: string;
}
