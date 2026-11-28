import cors from 'cors';
import express from 'express';
import { createDatabaseClient } from './db/client';
import { createLandlordsRouter } from './routes/landlords';
import { createPaymentsRouter } from './routes/payments';
import { createProfileRouter } from './routes/profile';
import { createPropertiesRouter } from './routes/properties';
import { createTenantsRouter } from './routes/tenants';
import { startPaymentPoller } from './stellar/poller';

export const createServer = () => {
  const db = createDatabaseClient();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/landlords', createLandlordsRouter(db));
  app.use('/api/properties', createPropertiesRouter(db));
  app.use('/api/tenants', createTenantsRouter(db));
  app.use('/api/profile', createProfileRouter(db));
  app.use('/api/payments', createPaymentsRouter(db));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  startPaymentPoller(db);

  return app;
};
