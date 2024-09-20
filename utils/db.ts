import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
console.log(process.env.NEXT_PUBLIC_NEON_DB)
const sql = neon(process.env.NEXT_PUBLIC_NEON_DB!);
export const db = drizzle(sql,{schema});