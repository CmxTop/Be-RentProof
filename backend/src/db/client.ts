import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { runMigrations } from './schema';

export type DatabaseConfig = {
  filePath?: string;
};

export const createDatabaseClient = (config: DatabaseConfig = {}) => {
  const filePath = config.filePath ?? 'data/rentproof.db';
  mkdirSync(dirname(filePath), { recursive: true });

  const db = new Database(filePath);
  db.pragma('journal_mode = WAL');
  runMigrations(db);

  return db;
};
