import { ApiProperty } from '@nestjs/swagger';

export class SearchSallerDto {
  @ApiProperty({
    description: 'CNPJ do vendedor a ser buscado',
    example: '82381421000174',
  })
  cnpj: string;
}
