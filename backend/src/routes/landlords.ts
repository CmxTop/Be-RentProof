import { Router } from 'express';
import type Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

const createLandlordSchema = z.object({
  walletAddress: z.string().min(1),
});

export const createLandlordsRouter = (db: Database.Database): Router => {
  const router = Router();

  router.post('/', (req, res) => {
    const parsed = createLandlordSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const existing = db
      .prepare('SELECT id FROM landlords WHERE wallet_address = ?')
      .get(parsed.data.walletAddress) as { id: string } | undefined;

    if (existing) {
      res.status(200).json({ id: existing.id, walletAddress: parsed.data.walletAddress });
      return;
    }

    const id = randomUUID();
    db.prepare('INSERT INTO landlords (id, wallet_address) VALUES (?, ?)').run(id, parsed.data.walletAddress);

    res.status(201).json({ id, walletAddress: parsed.data.walletAddress });
  });

  router.get('/:landlordId', (req, res) => {
    const row = db.prepare('SELECT * FROM landlords WHERE id = ?').get(req.params.landlordId);
    if (!row) {
      res.status(404).json({ error: 'Landlord not found' });
      return;
    }
    res.json(row);
  });

  return router;
};
