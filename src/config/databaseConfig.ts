import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  uri: string;
  user?: string;
  password?: string;
  name: string;
  options: object;
}

export const databaseConfig: DatabaseConfig = {
  uri: process.env.DB_URI || 'mongodb://localhost:27017',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  name: process.env.DB_NAME || 'ecommerce',
  options: process.env.DB_OPTIONS ? JSON.parse(process.env.DB_OPTIONS) : {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
