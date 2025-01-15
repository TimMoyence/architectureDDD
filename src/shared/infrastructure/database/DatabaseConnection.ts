import mongoose from 'mongoose';
import { databaseConfig } from '../../../config/databaseConfig';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};