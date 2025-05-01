import { db } from "./db";
import { sql } from "drizzle-orm";
import { properties, agents, testimonials, contactMessages, newsletters } from "@shared/schema";

async function resetDatabase() {
  console.log('Resetting database...');
  
  try {
    // Delete data from all tables
    await db.execute(sql`TRUNCATE TABLE ${properties} RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE ${agents} RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE ${testimonials} RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE ${contactMessages} RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE ${newsletters} RESTART IDENTITY CASCADE`);
    
    console.log('✓ Database reset successfully!');
    return true;
  } catch (error) {
    console.error('Error resetting database:', error);
    return false;
  }
}

resetDatabase().then(success => {
  if (success) {
    console.log('Now run the seed script with: npx tsx server/seed.ts');
  }
  process.exit(success ? 0 : 1);
});
