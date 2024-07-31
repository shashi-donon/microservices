import { Pool } from "pg";
import * as schema from "./schema";
import { DB_URL } from "../config";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

console.log(DB_URL)
const pool = new Pool({connectionString: DB_URL})
export const DB:NodePgDatabase<typeof schema> = drizzle(pool,{schema})