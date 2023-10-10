import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto {
  @ApiProperty({ description: 'Código do municipio da cidade', example: '3363' })
  codmuni: string;

  @ApiProperty({ description: 'Unidade federativa da cidade', example: 'BA' })
  uf_muni: string;

  @ApiProperty({ description: 'nome da cidade', example: 'barreiras' })
  nommuni: string;

  @ApiProperty({ description: 'ID da cidade', example: '82381421000174001' })
  id_fili: string;
}
