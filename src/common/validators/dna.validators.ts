import { BadRequestException } from '@nestjs/common';
import { VALID_NITROGENOUS_BASE_CHARS } from '../constants/app.constants';

export class DnaValidator {
  static validateDna(dna: string[]) {
    const allNitrogenousBase = dna.reduce((string, nitrogenousBase) => {
      string += nitrogenousBase;
      return string;
    }, '');

    const pattern = new RegExp('[^' + VALID_NITROGENOUS_BASE_CHARS + ']');
    if (allNitrogenousBase.toUpperCase().match(pattern) != null) {
      throw new BadRequestException(
        'some nitrogenous base character(s) is(are) not allowed',
      );
    }

    const matrix = dna.map((nitrogenousBase) => nitrogenousBase.split(''));
    const cols = matrix.length;
    const rows = matrix[0].length;
    if (cols !== rows) {
      throw new BadRequestException(
        `the dna table received is not a valid square (${cols}x${rows})`,
      );
    }
  }
}
