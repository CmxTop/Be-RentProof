import type Database from 'better-sqlite3';

export const runMigrations = (db: Database.Database): void => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS landlords (
      id TEXT PRIMARY KEY,
      wallet_address TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      landlord_id TEXT NOT NULL REFERENCES landlords(id),
      property_code TEXT NOT NULL UNIQUE,
      address TEXT NOT NULL,
      rent_amount TEXT NOT NULL,
      currency TEXT NOT NULL,
      due_day INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tenants (
      id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      wallet_address TEXT,
      property_id TEXT REFERENCES properties(id),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS rent_payments (
      id TEXT PRIMARY KEY,
      property_id TEXT NOT NULL REFERENCES properties(id),
      tenant_id TEXT REFERENCES tenants(id),
      transaction_hash TEXT NOT NULL UNIQUE,
      amount TEXT NOT NULL,
      asset TEXT NOT NULL,
      memo TEXT NOT NULL,
      paid_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
};
