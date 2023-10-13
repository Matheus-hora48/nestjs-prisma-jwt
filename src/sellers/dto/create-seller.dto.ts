import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({
    description: 'Código do usuário',
    example: 3,
  })
  codusua: number;
  @ApiProperty({
    description: 'Id da filial, geralmente o cnpj + coddomi',
    example: '82381421000174',
  })
  id_fili: string;
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'roberto',
  })
  logusua: string;
}
