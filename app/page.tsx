import BookPages from "@/components/book/BookPages";
import { BookOriginal } from "@/types/books";

export default async function Home({ searchParams }: { searchParams: Promise<{ search: string }> }) {
  const { search } = await searchParams;
  const res = await fetch(`${process.env.BASE_URL}/api/books`);

  if (!res.ok) {
    return <div>책을 찾을 수 없습니다.</div>
  }
  const booksData = await res.json();

  const books: BookOriginal[] = booksData.data;

  const filteredBooks = search ? books.filter(book => book.title.includes(search) || book.author.includes(search)) : books;

  return (
    <div className="mt-28">
      <BookPages books={filteredBooks} />
    </div>
  );
}
