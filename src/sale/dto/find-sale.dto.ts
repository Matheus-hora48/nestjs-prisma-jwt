import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class SaleFindDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Codigo do usuario que fez a venda para busca',
    example: 1,
  })
  logusua?: number;

  @IsString()
  @ApiProperty({
    description: 'CNPJ da empresa logada para busca',
    example: 82381421000174,
  })
  cnpj: string;

  @IsOptional()
  @IsNumber()
  codcida?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Codigo da cidade para busca',
    example: '2903201',
  })
  codmuni?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Codigo da filial para busca',
    example: '001',
  })
  codfili?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'Data inicial para busca',
    example: '2020-01-01 00:00:00',
  })
  dtebegn?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'Data final para busca',
    example: '2023-10-01 00:00:00',
  })
  dateend?: Date;
}
