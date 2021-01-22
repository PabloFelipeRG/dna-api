import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/simian (POST)', () => {
    return request(app.getHttpServer())
      .post('/simian')
      .send({
        dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAGGG', 'CCCCTA', 'TCACTG'],
      })
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('/simian (POST error)', () => {
    return request(app.getHttpServer())
      .post('/simian')
      .send({
        dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAGGG', 'CCCGTA', 'TCACTG'],
      })
      .set('Accept', 'application/json')
      .expect(403);
  });
});
