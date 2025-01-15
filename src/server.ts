// src/server.ts
import { createApp } from './app';
import { config } from './config';

const PORT = config.port || 3000;

createApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start the application', error);
});
