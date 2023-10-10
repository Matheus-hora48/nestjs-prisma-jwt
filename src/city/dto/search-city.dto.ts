import { ApiProperty } from '@nestjs/swagger';

export class SearchCityDto {
  @ApiProperty({
    description: 'CNPJ da cidade a ser buscada',
    example: '82381421000174',
  })
  cnpj: string;
}
