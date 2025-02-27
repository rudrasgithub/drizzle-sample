import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/*',  // Path to your schemas
  out: './src/db/migrations',  // Folder where migrations will be generated
  dbCredentials: {
    url: process.env.DATABASE_URL as string, // Connection string from environment variables
  }
});
