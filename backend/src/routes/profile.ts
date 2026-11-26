import { Router } from 'express';
import type Database from 'better-sqlite3';

export const createProfileRouter = (db: Database.Database): Router => {
  const router = Router();

  router.get('/:propertyCode', (req, res) => {
    const property = db
      .prepare('SELECT * FROM properties WHERE property_code = ?')
      .get(req.params.propertyCode);

    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    const payments = db
      .prepare(
        `SELECT transaction_hash, amount, asset, paid_at, status
         FROM rent_payments
         WHERE property_id = (SELECT id FROM properties WHERE property_code = ?)
         ORDER BY paid_at DESC`,
      )
      .all(req.params.propertyCode);

    res.json({ property, payments });
  });

  return router;
};
