import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../db/drizzle.module';
import type { DrizzleClient } from '../db';
import { posts, users, comments } from '../db/schema';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleClient) {}

  // Relational API — simple and clean for nested data
  async findAll() {
    return this.db.query.posts.findMany({
      with: {
        user: true,
        comments: {
          with: {
            user: true,
          },
        },
      },
    });
  }

  // Relational API — single post by id
  async findOne(id: number) {
    return this.db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        user: true,
        comments: {
          with: {
            user: true,
          },
        },
      },
    });
  }

  // SQL-like API — for when you want more control
  async findAllSimple() {
    return this.db.select().from(posts);
  }

  // SQL-like API — insert
  async create(title: string, content: string, userId: number) {
    const result = await this.db
      .insert(posts)
      .values({ title, content, userId })
      .returning();
    return result[0];
  }

  // SQL-like API — update
  async update(id: number, title: string, content: string) {
    const result = await this.db
      .update(posts)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return result[0];
  }

  // SQL-like API — delete
  async remove(id: number) {
    await this.db.delete(comments).where(eq(comments.postId, id));
    const result = await this.db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return result[0];
  }
}