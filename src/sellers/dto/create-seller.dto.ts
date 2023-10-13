import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({
    description: 'Codigo do usuario',
    example: 3,
  })
  codusua: number;
  @ApiProperty({
    description: 'Id da filial, geralmente o cnpj + coddomi',
    example: '82381421000174',
  })
  id_fili: string;
  @ApiProperty({
    description: 'Nome do usuario',
    example: 'roberto',
  })
  logusua: string;
}
