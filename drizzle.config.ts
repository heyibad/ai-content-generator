
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema:"./utils/schema.ts",
    dialect:"postgresql",
    dbCredentials:{
        url:String(process.env.NEXT_PUBLIC_NEON_DB!)
    }})