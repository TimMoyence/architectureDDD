// src/app.ts
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { productRoutes } from './modules/product/interfaces/routes/productRoutes';
// import { orderRoutes } from './modules/order/interfaces/routes/orderRoutes';
// import { userRoutes } from './modules/user/interfaces/routes/userRoutes';
import { connectDB } from './shared/infrastructure/database/DatabaseConnection';

export const createApp = async (): Promise<Application> => {
  await connectDB();

  const app = express();
  app.use(bodyParser.json());

  // Définition des routes
  app.use('/api', productRoutes);
  // app.use('/api', orderRoutes);
  // app.use('/api', userRoutes);

  // Gestion des erreurs globales
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
  });

  return app;
};
