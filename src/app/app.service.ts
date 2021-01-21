import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public isSimian(dna: string[]) {
    const matrix = dna.map((nitrogenousBase) =>
      nitrogenousBase.toUpperCase().split(''),
    );
    let totalSequences = 0;

    totalSequences += this.getHorizontalSequence(matrix);
    console.log(totalSequences);
    if (totalSequences >= 2) return true;

    totalSequences += this.getVerticalSequence(matrix);
    console.log(totalSequences);
    if (totalSequences >= 2) return true;

    totalSequences += this.getDiagonalSequence(matrix);
    console.log(totalSequences);
    if (totalSequences >= 2) return true;

    return false;
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

    hasSequence(this.verifyDiagonalSequence(matrix));
    hasSequence(this.verifyAntiDiagonalSequence(matrix));
    return diagonalSequences;
  }

  private verifyDiagonalSequence(matrix: string[][]): string[][] {
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

  private verifyAntiDiagonalSequence(matrix: string[][]): string[][] {
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
