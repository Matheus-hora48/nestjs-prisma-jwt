import { ApiProperty } from '@nestjs/swagger';

export class CreateBudgetDto {
  @ApiProperty({
    description: 'Id da filial, geralmente o cnpj + coddomi',
    example: '82381421000174',
  })
  id_fili: string;
  @ApiProperty({
    description: '',
    example: 'Dv',
  })
  resseri: string;
  @ApiProperty({
    description: 'Código da filial',
    example: '001',
  })
  codfili: string;

  @ApiProperty({
    description: 'Data do orcamento',
    example: '2020-03-01 00:00:00',
  })
  datpedi: Date;
  @ApiProperty({
    description: 'Código do orcamento',
    example: 2,
  })
  codorca: number;
  @ApiProperty({
    description: 'Código do usuário que fez o orcamento',
    example: 3,
  })
  codusua: number;
  @ApiProperty({
    description: '',
    example: 14,
  })
  codclie: number;
  @ApiProperty({
    description: 'Valor do orcamento',
    example: 122,
  })
  vlrorca: number;
  @ApiProperty({
    description: 'Valor liquido do orcamento',
    example: 122,
  })
  vlrliqu: number;
  @ApiProperty({
    description: 'Nome do parceiro',
    example: '-VENDA AO CONSUMIDOR-',
  })
  nomparc: string;
  @ApiProperty({
    description: '',
    example: 'F',
  })
  staorca: string;
  @ApiProperty({
    description: 'Código da cidade da venda',
    example: 2903201,
  })
  cidade: number;
  @ApiProperty({
    description: 'Produtos da venda',
    example: {},
  })
  produtos: JSON;
}
