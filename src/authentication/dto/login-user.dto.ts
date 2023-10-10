import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ description: 'O CNPJ do usuário', example: '82381421000174' })
  cnpj: string;
  @ApiProperty({
    description: 'A senha do usuário',
    example: '12345678',
  })
  senhaHash: string;
}
