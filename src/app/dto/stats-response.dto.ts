import { ApiProperty } from '@nestjs/swagger';

export class StatsResponseDto {
  @ApiProperty({ description: 'total number of mutant dnas registered' })
  count_mutant_dna: number;

  @ApiProperty({ description: 'total number of human dnas registered' })
  count_human_dna: number;

  @ApiProperty({ description: 'proportion of mutant to the human population' })
  ratio: number;
}
