
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema:"./utils/schema.ts",
    out: "./utils/migrations",
    dialect:"postgresql",
    dbCredentials:{
        url:String(process.env.NEXT_PUBLIC_NEON_DB_URL!)
    }})