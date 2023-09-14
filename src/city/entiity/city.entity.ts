import { ApiProperty } from '@nestjs/swagger';
import { Cidade } from '@prisma/client';

export class CityEntity implements Cidade {
  @ApiProperty()
  id: number;
  @ApiProperty()
  codmuni: number;
  @ApiProperty()
  uf_muni: string;
  @ApiProperty()
  nommuni: string;
  @ApiProperty()
  id_fili: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
