import { ApiProperty } from '@nestjs/swagger';

export class DnaDto {
  @ApiProperty({ description: 'nitrogenous base array' })
  dna: string[];

  constructor({ dna = [] }: { dna: string[] }) {
    Object.assign(this, { dna });
  }
}
