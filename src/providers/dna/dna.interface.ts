import { Document } from 'mongoose';

export interface Dna extends Document {
  readonly dna: string[];
  readonly isSimian: boolean;
}
