import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultException } from '../common/exceptions/default.exception';
import { HTTP_OK_RESPONSE_CODE } from '../common/constants/app.constants';
import { AppService } from './app.service';
import { DnaDto } from './dto/dna.dto';
import { StatsResponseDto } from './dto/stats-response.dto';
import { DnaValidator } from '../common/validators/dna.validators';

@ApiTags('Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/simian')
  @HttpCode(HTTP_OK_RESPONSE_CODE)
  @ApiOkResponse({ description: 'the dna is from a simian' })
  @ApiForbiddenResponse({
    description: 'the given dna is not from a simian',
    type: DefaultException,
  })
  @ApiBadRequestResponse({
    description: 'response when the body does not match the validation',
    type: DefaultException,
  })
  @ApiInternalServerErrorResponse({
    description: 'response when an unexpected exception was thrown',
    type: DefaultException,
  })
  isSimian(@Body() dnaDto: DnaDto): void | HttpException {
    DnaValidator.validateDna(dnaDto.dna);
    const isSimian = this.appService.isSimian(dnaDto.dna);
    if (!isSimian) {
      throw new ForbiddenException('the given dna is not from a simian');
    }
  }

  @Get('/stats')
  @ApiOkResponse({
    description: 'the stats of the registered dnas',
    type: StatsResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'response when an unexpected exception was thrown',
    type: DefaultException,
  })
  getStats(): Promise<StatsResponseDto | HttpException> {
    return this.appService.getStats();
  }
}
