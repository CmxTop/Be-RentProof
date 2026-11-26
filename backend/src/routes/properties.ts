import { Router } from 'express';
import type Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { generatePropertyCode } from '../lib/propertyCode';

const createPropertySchema = z.object({
  landlordId: z.string().min(1),
  address: z.string().min(1),
  rentAmount: z.string().min(1),
  currency: z.enum(['USDC', 'XLM']),
  dueDay: z.number().int().min(1).max(28),
});

export const createPropertiesRouter = (db: Database.Database): Router => {
  const router = Router();

  router.post('/', (req, res) => {
    const parsed = createPropertySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { landlordId, address, rentAmount, currency, dueDay } = parsed.data;

    let propertyCode = generatePropertyCode();
    const existing = db.prepare('SELECT 1 FROM properties WHERE property_code = ?');
    while (existing.get(propertyCode)) {
      propertyCode = generatePropertyCode();
    }

    const id = randomUUID();
    db.prepare(
      `INSERT INTO properties (id, landlord_id, property_code, address, rent_amount, currency, due_day)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(id, landlordId, propertyCode, address, rentAmount, currency, dueDay);

    res.status(201).json({ id, propertyCode, address, rentAmount, currency, dueDay });
  });

  router.get('/', (req, res) => {
    const landlordId = typeof req.query.landlordId === 'string' ? req.query.landlordId : undefined;

    const rows = landlordId
      ? db.prepare('SELECT * FROM properties WHERE landlord_id = ? ORDER BY created_at DESC').all(landlordId)
      : db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();

    res.json(rows);
  });

  router.get('/:propertyCode', (req, res) => {
    const row = db.prepare('SELECT * FROM properties WHERE property_code = ?').get(req.params.propertyCode);
    if (!row) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json(row);
  });

  return router;
};
