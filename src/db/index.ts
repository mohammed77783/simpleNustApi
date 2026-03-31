import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export function createDrizzleClient(databaseUrl: string) {
  const connection = postgres(databaseUrl);
  return drizzle(connection, { schema });
}

export type DrizzleClient = ReturnType<typeof createDrizzleClient>;