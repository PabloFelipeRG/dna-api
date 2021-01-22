import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('get diagonals', () => {
    const matrix = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'G', 'G'],
      ['C', 'C', 'C', 'C', 'T', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    it('should return all the diagonals from a matrix', () => {
      const diagonals = [
        ['A'],
        ['G', 'C'],
        ['C', 'G', 'T'],
        ['G', 'T', 'G', 'G'],
        ['T', 'G', 'T', 'G', 'A'],
        ['A', 'A', 'A', 'G', 'T', 'G'],
        ['C', 'T', 'A', 'C', 'T'],
        ['T', 'G', 'C', 'C'],
        ['A', 'C', 'A'],
        ['C', 'C'],
        ['T'],
      ];

      const result = appService['getAllDiagonals'](matrix);
      expect(result).toStrictEqual(diagonals);
    });

    it('should return all the anti diagonals from a matrix', () => {
      const antiDiagonals = [
        ['A'],
        ['T', 'C'],
        ['G', 'A', 'T'],
        ['C', 'G', 'T', 'A'],
        ['G', 'T', 'A', 'G', 'C'],
        ['A', 'G', 'T', 'A', 'C', 'T'],
        ['C', 'G', 'G', 'C', 'C'],
        ['T', 'G', 'C', 'A'],
        ['G', 'T', 'C'],
        ['A', 'T'],
        ['G'],
      ];

      const result = appService['getAllAntiDiagonals'](matrix);
      expect(result).toStrictEqual(antiDiagonals);
    });
  });

  describe('getDiagonalSequence', () => {
    const matrixWithoutDiagonalSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'G', 'G'],
      ['C', 'C', 'C', 'C', 'T', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    const matrixWithDiagonalSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'A', 'G', 'G'],
      ['C', 'C', 'C', 'C', 'A', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    const matrixWithAntiDiagonalSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'G'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'G', 'G'],
      ['C', 'C', 'G', 'C', 'T', 'A'],
      ['T', 'G', 'A', 'C', 'T', 'G'],
    ];

    const matrixWithBothDiagonalsSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'G'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'A', 'T', 'G'],
      ['C', 'C', 'G', 'T', 'T', 'A'],
      ['T', 'C', 'T', 'C', 'T', 'G'],
    ];

    it('should 0 diagonals sequences from the matrixWithoutDiagonalSequence', () => {
      const result = appService['getDiagonalSequence'](
        matrixWithoutDiagonalSequence,
      );
      expect(result).toStrictEqual(0);
    });

    it('should 1 diagonals sequences from the matrixWithDiagonalSequence', () => {
      const result = appService['getDiagonalSequence'](
        matrixWithDiagonalSequence,
      );
      expect(result).toStrictEqual(1);
    });

    it('should 1 diagonals sequences from the matrixWithAntiDiagonalSequence', () => {
      const result = appService['getDiagonalSequence'](
        matrixWithAntiDiagonalSequence,
      );
      expect(result).toStrictEqual(1);
    });

    it('should 2 diagonals sequences from the matrixWithBothDiagonalsSequence', () => {
      const result = appService['getDiagonalSequence'](
        matrixWithBothDiagonalsSequence,
      );
      expect(result).toStrictEqual(2);
    });
  });

  describe('getVerticalSequence', () => {
    const matrixWithoutVerticalSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'T', 'G'],
      ['C', 'C', 'C', 'C', 'T', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    const matrixWithOneVerticalSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'G', 'G'],
      ['C', 'C', 'C', 'C', 'G', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    const matrixWithTwoVerticalSequences = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'G', 'G'],
      ['C', 'C', 'A', 'C', 'G', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    it('should 0 vertical sequence from the matrixWithoutVerticalSequence', () => {
      const result = appService['getVerticalSequence'](
        matrixWithoutVerticalSequence,
      );
      expect(result).toStrictEqual(0);
    });

    it('should 1 vertical sequence from the matrixWithOneVerticalSequence', () => {
      const result = appService['getVerticalSequence'](
        matrixWithOneVerticalSequence,
      );
      expect(result).toStrictEqual(1);
    });

    it('should 2 vertical sequences from the matrixWithTwoVerticalSequences', () => {
      const result = appService['getVerticalSequence'](
        matrixWithTwoVerticalSequences,
      );
      expect(result).toStrictEqual(2);
    });
  });

  describe('getHorizontalSequence', () => {
    const matrixWithoutHorizontalSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'T', 'G'],
      ['C', 'C', 'G', 'C', 'T', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    const matrixWithOneHorizontalSequence = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'G', 'A', 'G', 'G', 'G'],
      ['C', 'C', 'C', 'C', 'C', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    const matrixWithTwoHorizontalSequences = [
      ['A', 'T', 'G', 'C', 'G', 'A'],
      ['C', 'A', 'G', 'T', 'G', 'C'],
      ['T', 'T', 'A', 'T', 'G', 'T'],
      ['A', 'A', 'A', 'A', 'A', 'G'],
      ['C', 'C', 'C', 'C', 'G', 'A'],
      ['T', 'C', 'A', 'C', 'T', 'G'],
    ];

    it('should 0 horizontal sequence from the matrixWithoutHorizontalSequence', () => {
      const result = appService['getHorizontalSequence'](
        matrixWithoutHorizontalSequence,
      );
      expect(result).toStrictEqual(0);
    });

    it('should 1 horizontal sequence from the matrixWithOneHorizontalSequence', () => {
      const result = appService['getHorizontalSequence'](
        matrixWithOneHorizontalSequence,
      );
      expect(result).toStrictEqual(1);
    });

    it('should 2 horizontal sequences from the matrixWithTwoHorizontalSequences', () => {
      const result = appService['getHorizontalSequence'](
        matrixWithTwoHorizontalSequences,
      );
      expect(result).toStrictEqual(2);
    });
  });

  describe('isSimian', () => {
    const invalidSimianDna = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAGTG',
      'CCCCTA',
      'TCACTG',
    ];

    const validSimianDnaWithTwoSequences = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAGGG',
      'CCCCTA',
      'TCACTG',
    ];

    const validSimianDnaWithThreeSequences = [
      'GTGCGA',
      'CGGTGC',
      'TTGTGT',
      'AGAGGG',
      'CCCCGA',
      'TCACTG',
    ];

    it('should return false for invalidSimianDna', () => {
      const result = appService.isSimian(invalidSimianDna);
      expect(result).toBe(false);
    });

    it('should return true for validSimianDnaWithTwoSequences', () => {
      const result = appService.isSimian(validSimianDnaWithTwoSequences);
      expect(result).toBe(true);
    });

    it('should return true for validSimianDnaWithThreeSequences', () => {
      const result = appService.isSimian(validSimianDnaWithThreeSequences);
      expect(result).toBe(true);
    });
  });
});
