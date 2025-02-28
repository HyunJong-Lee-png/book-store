import { books } from '@/db/schema'

export type BookOriginal = typeof books.$inferSelect;

export type BookProps = Omit<BookOriginal, 'createdAt' | 'updatedAt'>
