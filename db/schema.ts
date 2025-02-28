import { date, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const books = pgTable('books', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  image: text('image').default('').notNull(),
  publishedDate: date('published_date').notNull(),
  price: integer('price').notNull(),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  salesVolume: integer('sales_volume').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});
