import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
  @ApiProperty({ description: 'Http status code' })
  statusCode!: number;
  @ApiProperty({ description: 'Exception message' })
  message!: string;
  @ApiProperty({ description: 'Exception error' })
  error!: string;
}
