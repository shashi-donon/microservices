import 'dotenv/config'
import { defineConfig, Config } from 'drizzle-kit'
import { DB_URL } from './src/config'

export default defineConfig({
  schema: "./src/db/schema/*",
  dialect: 'postgresql',
  dbCredentials: {url:DB_URL},
  verbose: true,
  strict: true,
}) satisfies Config

