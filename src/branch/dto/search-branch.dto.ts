import { ApiProperty } from '@nestjs/swagger';

export class SearchBranchDto {
  @ApiProperty({ description: 'CNPJ da filial a ser buscada', example: '82381421000174' })
  cnpj: string;
}
