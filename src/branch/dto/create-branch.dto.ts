import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ description: 'Código do domínio da filial', example: '001' })
  coddomi: string;

  @ApiProperty({ description: 'CNPJ da filial', example: '82381421000174' })
  cnpfili: string;

  @ApiProperty({ description: 'ID da filial', example: '82381421000174001' })
  id_fili: string;
}
