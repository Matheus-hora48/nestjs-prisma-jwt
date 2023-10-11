import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class VisitFindCnpjDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Cnpj da empresa que fez a visita',
    example: '82381421000174',
  })
  cnpj?: string;
}
