import { relations } from "drizzle-orm/relations";
import { users, posts, comments } from "./schema";

export const postsRelations = relations(posts, ({one, many}) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
	comments: many(comments),
}));

export const usersRelations = relations(users, ({many}) => ({
	posts: many(posts),
	comments: many(comments),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));