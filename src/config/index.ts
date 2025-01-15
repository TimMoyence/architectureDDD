// src/config/index.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/ecommerce',
  },
};
