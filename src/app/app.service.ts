import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { DNA_MODEL } from '../common/constants/database.constants';
import { Dna } from 'src/providers/dna/dna.interface';

@Injectable()
export class AppService {
  constructor(@Inject(DNA_MODEL) private readonly dnaModel: Model<Dna>) {}

  public isSimian(dna: string[]): boolean {
    const matrix = dna.map((nitrogenousBase) =>
      nitrogenousBase.toUpperCase().split(''),
    );

    const positiveResult = () => {
      this.insertDna(dna, true);
      return true;
    };

    const negativeResult = () => {
      this.insertDna(dna, false);
      return false;
    };

    if (matrix.length <= 3) {
      return negativeResult();
    }

    let totalSequences = 0;

    totalSequences += this.getHorizontalSequence(matrix);
    if (totalSequences >= 2) return positiveResult();

    totalSequences += this.getVerticalSequence(matrix);
    if (totalSequences >= 2) return positiveResult();

    totalSequences += this.getDiagonalSequence(matrix);
    if (totalSequences >= 2) return positiveResult();

    return negativeResult();
  }

  public async getStats() {
    const dnas = await this.dnaModel.find();

    return dnas.reduce(
      (totalCount: any, dna: Dna) => {
        if (dna.isSimian) totalCount.count_mutant_dna++;
        else totalCount.count_human_dna++;

        totalCount.ratio = parseFloat(
          (totalCount.count_mutant_dna / totalCount.count_human_dna).toFixed(1),
        );

        return totalCount;
      },
      {
        count_mutant_dna: 0,
        count_human_dna: 0,
        ratio: 0,
      },
    );
  }

  private async insertDna(
    dna: string[],
    isSimian: boolean,
  ): Promise<void | HttpException> {
    try {
      const newDna = {
        dna,
        isSimian,
      } as Dna;

      const dnaAlreadySaved = await this.dnaModel.findOne(newDna);
      if (!dnaAlreadySaved) await this.dnaModel.create(newDna);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private getHorizontalSequence(matrix: string[][]): number {
    let horizontalSequences = 0;

    matrix.forEach((line) => {
      let sequenceCount = 1;
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const char = line[charIndex];

        if (charIndex > 0) {
          const previousChar = line[charIndex - 1];
          sequenceCount = char === previousChar ? sequenceCount + 1 : 1;

          if (sequenceCount >= 4) {
            horizontalSequences++;
            break;
          }
        }
      }
    });

    return horizontalSequences;
  }

  private getVerticalSequence(matrix: string[][]): number {
    const totalRows = matrix.length;
    const totalCols = matrix[0].length;
    let verticalSequences = 0;

    for (let i = 0; i < totalCols; i++) {
      let sequenceCount = 1;
      const colY = i;
      let rowX = 1;

      while (rowX < totalRows) {
        const char = matrix[rowX][colY];
        const previousChar = matrix[rowX - 1][colY];
        rowX++;

        if (char === previousChar) {
          sequenceCount++;
        } else {
          sequenceCount = 1;
        }

        if (sequenceCount >= 4) {
          verticalSequences++;
          break;
        }
      }
    }

    return verticalSequences;
  }

  private getDiagonalSequence(matrix: string[][]): number {
    let diagonalSequences = 0;

    const hasSequence = (matrix: string[][]) => {
      matrix.forEach((diagonals: string[]) => {
        let sequenceCount = 1;
        for (let charIndex = 0; charIndex < diagonals.length; charIndex++) {
          const char = diagonals[charIndex];

          if (charIndex > 0) {
            const previousChar = diagonals[charIndex - 1];
            sequenceCount = char === previousChar ? sequenceCount + 1 : 1;

            if (sequenceCount >= 4) {
              diagonalSequences++;
              break;
            }
          }
        }
      });
    };

    hasSequence(this.getAllDiagonals(matrix));
    hasSequence(this.getAllAntiDiagonals(matrix));
    return diagonalSequences;
  }

  private getAllDiagonals(matrix: string[][]): string[][] {
    const totalRows = matrix.length;
    const totalCols = matrix[0].length;
    const result = [];
    let rowX: number, colY: number;

    const grabPosition = (diagonal: string[]) => {
      const position = matrix[rowX][colY];
      if (position) diagonal.push(position);
      rowX++;
      colY++;
    };

    for (let i = totalCols - 1; i >= 0; i--) {
      colY = i;
      rowX = 0;

      const diagonal = [];
      while (colY < totalCols) {
        grabPosition(diagonal);
      }

      result.push(diagonal);
    }

    for (let i = 1; i < totalRows; i++) {
      rowX = i;
      colY = 0;

      const diagonal = [];
      while (rowX < totalRows) {
        grabPosition(diagonal);
      }

      result.push(diagonal);
    }

    return result;
  }

  private getAllAntiDiagonals(matrix: string[][]): string[][] {
    const totalRows = matrix.length;
    const totalCols = matrix[0].length;
    const result = [];
    let rowX: number, colY: number;

    const grabPosition = (diagonal: string[]) => {
      const position = matrix[rowX][colY];
      if (position) diagonal.push(position);
      rowX++;
      colY--;
    };

    for (let i = 0; i < totalCols; i++) {
      colY = i;
      rowX = 0;

      const diagonal = [];
      while (colY >= 0 && rowX < totalRows) {
        grabPosition(diagonal);
      }

      result.push(diagonal);
    }

    for (let i = 1; i < totalRows; i++) {
      rowX = i;
      colY = totalCols - 1;

      const diagonal = [];
      while (rowX < totalRows) {
        grabPosition(diagonal);
      }

      result.push(diagonal);
    }

    return result;
  }
}
