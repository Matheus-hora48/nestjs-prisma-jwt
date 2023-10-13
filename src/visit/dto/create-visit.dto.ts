import { ApiProperty } from '@nestjs/swagger';

export class CreateVisitDto {
  @ApiProperty({
    description: 'Código da visita',
    example: '1',
  })
  codvist: number;
  @ApiProperty({
    description: 'Id da filial, geralmente o cnpj + coddomi',
    example: '82381421000174',
  })
  id_fili: string;
  @ApiProperty({
    description: 'Data da visita',
    example: '2023-03-01 00:00:00',
  })
  datvist: Date;
  @ApiProperty({
    description: 'Nome da empresa que foi feita a visita',
    example: 'top',
  })
  empvist: string;
  @ApiProperty({
    description: 'Responsavel pela empresa da visita',
    example: 'carlos',
  })
  resvist: string;
  @ApiProperty({
    description: 'Documento CNPJ ou CPF',
    example: '84526115000104',
  })
  docvist: string;
  @ApiProperty({
    description: 'Telefone da empresa que teve a visita',
    example: '77999887766',
  })
  fonvist: string;
  @ApiProperty({
    description: 'Local por onde a visita foi feita',
    example: 1,
  })
  locvist: number;
  @ApiProperty({
    description: 'Usuário que fez a visita',
    example: 3,
  })
  usuvist: number;
  @ApiProperty({
    description: 'Data e hora do registro',
    example: '2023-03-01 10:55:32',
  })
  dtrvist: Date;
  @ApiProperty({
    description: 'Registrado de leads 0:Não -1:Sim',
    example: 0,
  })
  is_leds: number;
  @ApiProperty({
    description: 'Data e hora do registro de leads',
    example: '2023-03-01 10:55:32',
  })
  dthleds: Date;
  @ApiProperty({
    description: 'Observações de leads',
    example: 'A empresa é azul',
  })
  obsleds: string;
  @ApiProperty({
    description: 'Código do usuário que o transformou em leads',
    example: 3,
  })
  usuleds: number;
  @ApiProperty({
    description: 'Registrado de parceiro 0:Não -1:Sim',
    example: 0,
  })
  is_parc: number;
  @ApiProperty({
    description: 'Data e hora do registro de parceiro',
    example: 0,
  })
  dthparc: Date;
  @ApiProperty({
    description: 'Observação para prospect',
    example: 'Novo cliente',
  })
  obsparc: string;
  @ApiProperty({
    description: 'Código do usuário que o transformou em prospect',
    example: 3,
  })
  usuparc: number;
  @ApiProperty({
    description: 'Código da Cidade IBGE',
    example: 2903201,
  })
  codcida: number;
  @ApiProperty({
    description: 'Filial da Visita',
    example: '001',
  })
  filvist: string;
}
