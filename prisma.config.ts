import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
import path from 'node:path';
export default defineConfig({
  schema: path.join('src/prisma', 'models'),
  migrations: {
    path: 'prisma/migrations',
    seed: `tsx src/prisma/seed2.ts`,
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
