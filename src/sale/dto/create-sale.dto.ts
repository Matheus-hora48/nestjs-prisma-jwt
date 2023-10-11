import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({
    description: 'Id da filial, geralmente o cnpj + coddomi',
    example: '82381421000174',
  })
  id_fili: string;
  @ApiProperty({
    description: 'Codigo da filial',
    example: '001',
  })
  codfili: string;
  @ApiProperty({
    description: '',
    example: 'D1',
  })
  servend: string;
  @ApiProperty({
    description: 'Numero da nota',
    example: '214',
  })
  numnota: Number;
  @ApiProperty({
    description: 'Data da venda',
    example: '2020-03-01 00:00:00',
  })
  datvend: Date;
  @ApiProperty({
    description: 'Codigo do parceiro',
    example: 13,
  })
  codparc: number;
  @ApiProperty({
    description: 'Codigo do vendedor que fez a venda',
    example: 3,
  })
  venvend: number;
  @ApiProperty({
    description: 'Valor liquido da venda',
    example: 122,
  })
  vlrliqu: number;
  @ApiProperty({
    description: 'Valor da nota',
    example: 122,
  })
  vlrnota: number;
  @ApiProperty({
    description: 'Nome do parceiro',
    example: '-VENDA AO CONSUMIDOR-',
  })
  nomparc: string;
  @ApiProperty({
    description: '',
    example: 'A',
  })
  staorca: string;
  @ApiProperty({
    description: 'Codigo da cidade da venda',
    example: 2903201,
  })
  cidade: number;
  @ApiProperty({
    description: 'Produtos da venda',
    example: {},
  })
  produtos: JSON;
}
