import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users, posts, comments } from './schema';

const connection = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(connection);

async function main() {
  console.log('Seeding database...');
  // Clear existing data (order matters because of foreign keys)
  await db.delete(comments);
  await db.delete(posts);
  await db.delete(users);
  // Insert users
  const insertedUsers = await db
    .insert(users)
    .values([
      { name: 'Ahmed', email: 'ahmed@example.com' },
      { name: 'Sara', email: 'sara@example.com' },
      { name: 'Khalid', email: 'khalid@example.com' },
    ])
    .returning();
  console.log('Users created:', insertedUsers.length);
  // Insert posts
  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        title: 'Getting started with Drizzle',
        content: 'Drizzle ORM is a great choice for TypeScript projects.',
        userId: insertedUsers[0].id,
      },
      {
        title: 'NestJS with Drizzle',
        content: 'How to integrate Drizzle ORM into a NestJS application.',
        userId: insertedUsers[0].id,
      },
      {
        title: 'PostgreSQL tips',
        content: 'Some useful tips when working with PostgreSQL.',
        userId: insertedUsers[1].id,
      },
    ])
    .returning();

  console.log('Posts created:', insertedPosts.length);

  // Insert comments
  const insertedComments = await db
    .insert(comments)
    .values([
      {
        text: 'Great article!',
        postId: insertedPosts[0].id,
        userId: insertedUsers[1].id,
      },
      {
        text: 'Very helpful, thanks!',
        postId: insertedPosts[0].id,
        userId: insertedUsers[2].id,
      },
      {
        text: 'I learned a lot from this.',
        postId: insertedPosts[1].id,
        userId: insertedUsers[1].id,
      },
    ])
    .returning();

  console.log('Comments created:', insertedComments.length);
  console.log('Seeding complete!');

  await connection.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});