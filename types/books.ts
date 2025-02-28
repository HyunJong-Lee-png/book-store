import { books } from '@/db/schema'

export type TypeBook = typeof books.$inferSelect;

export type PostTypeBook = Omit<TypeBook, 'createdAt' | 'updatedAt' | 'id' | 'salesVolume'>
