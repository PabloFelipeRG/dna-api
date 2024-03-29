import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DNA_MODEL } from '../../common/constants/database.constants';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { DnaDto } from '../dto/dna.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: DNA_MODEL,
          useValue: {
            create() {
              return;
            },
            findOne() {
              return;
            },
            find() {
              return;
            },
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('isSimian', () => {
    const validSimianDnaDto = new DnaDto({
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAGGG', 'CCCCTA', 'TCACTG'],
    });

    const invalidSimianDnaDto = new DnaDto({
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAGGG', 'CCCGTA', 'TCACTG'],
    });

    it('should return HTTP OK for valid simian DNA', () => {
      jest.spyOn(appService, 'isSimian').mockImplementation(() => true);

      appController.isSimian(validSimianDnaDto);
      expect(appService.isSimian).toHaveBeenCalledWith(validSimianDnaDto.dna);
    });

    it('should return HTTP Forbidden for invalid simian DNA', () => {
      jest.spyOn(appService, 'isSimian').mockImplementation(() => false);

      expect(() => appController.isSimian(invalidSimianDnaDto)).toThrow(
        ForbiddenException,
      );
      expect(appService.isSimian).toHaveBeenCalledWith(invalidSimianDnaDto.dna);
    });
  });

  describe('getStats', () => {
    it('should return the dnas stats', async () => {
      jest.spyOn(appService, 'getStats').mockResolvedValue({
        count_mutant_dna: 0,
        count_human_dna: 0,
        ratio: 0,
      });

      await appController.getStats();
      expect(appService.getStats).toHaveBeenCalled();
    });
  });
});
