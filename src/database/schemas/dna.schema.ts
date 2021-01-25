import * as mongoose from 'mongoose';

export const DnaSchema = new mongoose.Schema(
  {
    dna: { type: [String], required: true },
    isSimian: { type: Boolean, required: true },
  },
  { strict: false },
);
