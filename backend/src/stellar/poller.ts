import type Database from 'better-sqlite3';
import { indexPropertyPayments } from './history';

type PropertyRow = {
  id: string;
  landlord_id: string;
  property_code: string;
};

const indexAllProperties = async (db: Database.Database): Promise<void> => {
  const properties = db
    .prepare('SELECT id, landlord_id, property_code FROM properties')
    .all() as PropertyRow[];

  for (const property of properties) {
    try {
      await indexPropertyPayments(db, property);
    } catch (err) {
      console.error(`[poller] failed to index property ${property.property_code}:`, err);
    }
  }
};

/**
 * Starts a simple interval-based Horizon indexer: every `intervalMs`, walk
 * every registered property and pull in any new on-chain payments tagged
 * with its memo. Streaming (SSE) would be lower-latency but is overkill
 * for an MVP's demo-scale property count.
 */
export const startPaymentPoller = (db: Database.Database, intervalMs = 8000): NodeJS.Timeout => {
  return setInterval(() => {
    indexAllProperties(db).catch((err) => console.error('[poller] run failed:', err));
  }, intervalMs);
};
