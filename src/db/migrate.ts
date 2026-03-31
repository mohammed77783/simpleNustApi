import 'dotenv/config';
import {drizzle} from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
const connection=postgres(process.env.DATABASE_URL!,{max:1});
const db=drizzle(connection);

async function main (){
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations successful!');
     await connection.end();
}

main().catch((err)=>{
    console.error('Migration failed:', err);
    process.exit(1);
});
