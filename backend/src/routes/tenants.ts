import { Router } from 'express';
import type Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

const createTenantSchema = z.object({
  displayName: z.string().min(1),
  walletAddress: z.string().min(1).optional(),
});

const linkPropertySchema = z.object({
  propertyCode: z.string().min(1),
});

export const createTenantsRouter = (db: Database.Database): Router => {
  const router = Router();

  router.post('/', (req, res) => {
    const parsed = createTenantSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const id = randomUUID();
    db.prepare('INSERT INTO tenants (id, display_name, wallet_address) VALUES (?, ?, ?)').run(
      id,
      parsed.data.displayName,
      parsed.data.walletAddress ?? null,
    );

    res.status(201).json({ id, displayName: parsed.data.displayName });
  });

  router.post('/:tenantId/link', (req, res) => {
    const parsed = linkPropertySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const property = db
      .prepare('SELECT id FROM properties WHERE property_code = ?')
      .get(parsed.data.propertyCode) as { id: string } | undefined;

    if (!property) {
      res.status(404).json({ error: 'No property found with that code' });
      return;
    }

    const result = db
      .prepare('UPDATE tenants SET property_id = ? WHERE id = ?')
      .run(property.id, req.params.tenantId);

    if (result.changes === 0) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }

    res.json({ tenantId: req.params.tenantId, propertyId: property.id });
  });

  router.get('/:tenantId', (req, res) => {
    const row = db.prepare('SELECT * FROM tenants WHERE id = ?').get(req.params.tenantId);
    if (!row) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }
    res.json(row);
  });

  return router;
};
