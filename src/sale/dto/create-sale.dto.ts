import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({
    description: 'Id da filial, geralmente o cnpj + coddomi',
    example: '82381421000174',
  })
  id_fili: string;
  @ApiProperty({
    description: 'Código da filial',
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
    description: 'Código do parceiro',
    example: 13,
  })
  codparc: number;
  @ApiProperty({
    description: 'Código do vendedor que fez a venda',
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
    description: 'Código da cidade da venda',
    example: 2903201,
  })
  cidade: number;
  @ApiProperty({
    description: 'Código da venda',
    example: 281,
  })
  codvend: number;
  @ApiProperty({
    description: 'Produtos da venda',
    example: {},
  })
  produtos: JSON;
}
