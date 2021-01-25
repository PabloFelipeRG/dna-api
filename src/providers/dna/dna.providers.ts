import { Connection } from 'mongoose';
import {
  DATABASE_CONNECTION,
  DNA_MODEL,
  DNA_SCHEMA_NAME,
} from '../../common/constants/database.constants';
import { DnaSchema } from '../../database/schemas/dna.schema';

export const dnasProviders = [
  {
    provide: DNA_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(DNA_SCHEMA_NAME, DnaSchema),
    inject: [DATABASE_CONNECTION],
  },
];
