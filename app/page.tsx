import BookPages from "@/components/book/BookPages";
import { TypeBook } from "@/types/books";

const BASE_URL = process.env.PRODUCTION_URL || process.env.DEV_URL;

export default async function Home({ searchParams }: { searchParams: Promise<{ search: string }> }) {
  const { search } = await searchParams;
  const res = await fetch(`${BASE_URL}/api/books`);

  if (!res.ok) {
    return <div>책을 찾을 수 없습니다.</div>
  }
  const booksData = await res.json();

  const books: TypeBook[] = booksData.data;

  const filteredBooks = search ?
    books.filter(book =>
      book.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      || book.author.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : books;

  return (
    <div className="mt-28">
      <BookPages books={filteredBooks} />
    </div>
  );
}
