export type DatabaseConfig = {
  connectionString?: string;
};

export const createDatabaseClient = (config: DatabaseConfig) => ({
  status: 'pending',
  connectionString: config.connectionString ?? 'postgres://localhost/rentproof',
});

