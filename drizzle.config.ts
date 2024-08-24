
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema:"./utils/schema.ts",
    dialect:"postgresql",
    dbCredentials:{
        url:"postgresql://ai-content-sass_owner:DaxHw6QnOv9k@ep-restless-sunset-a1aw2rd8.ap-southeast-1.aws.neon.tech/ai-content-sass?sslmode=require"
    }})