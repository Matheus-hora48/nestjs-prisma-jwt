import { ApiProperty } from '@nestjs/swagger';

export class CreateProspectDto {
  @ApiProperty({
    description: 'Data que foi feito o prospect',
    example: '2020-03-01 00:00:00',
  })
  cadparc: Date;
  @ApiProperty({
    description: 'Codigo da filial',
    example: '001',
  })
  coddomi: string;
  @ApiProperty({
    description: 'Id da filial, geralmente o cnpj + coddomi',
    example: '82381421000174',
  })
  id_fili: string;
  @ApiProperty({
    description: 'Nome da pessoa que foi prospectado',
    example: 'NETO',
  })
  nomparc: string;
  @ApiProperty({
    description: 'Sobrenome da pessoa que foi prospectado',
    example: 'NENNENNENETOOO',
  })
  sobparc: string;
  @ApiProperty({
    description: 'Documento dessa pessoa CNPJ ou CPF',
    example: '72980753572',
  })
  cgcende: string;
  @ApiProperty({
    description: 'Telefone dessa pessoa',
    example: '773628-9700',
  })
  fonende: string;
  @ApiProperty({
    description: 'Codigo do parceiro',
    example: 98,
  })
  codparc: number;
  @ApiProperty({
    description: 'Codigo da cidade do prospect',
    example: 2903201,
  })
  codcida: number;
  @ApiProperty({
    description: 'Codigo do usuario que fez o prospect',
    example: 3,
  })
  usuparc: number;
  @ApiProperty({
    description: 'Codigo para saber se virou lead',
    example: 0,
  })
  is_leds: number;
  @ApiProperty({
    description: 'Codigo para saber se virou parceiro',
    example: 98,
  })
  is_parc: number;
}
