import BookPages from "@/components/book/BookPages";
import { TypeBook } from "@/types/books";

export interface WholeProps {
  data: {
    booksData: TypeBook[];
    currentPage: number;
    totalPage: number;
  }
}

const BASE_URL = process.env.BASE_URL;

export default async function Home({ searchParams }: { searchParams: Promise<{ search: string, page: string }> }) {
  const params = await searchParams;
  const search = params.search || '';
  const page = parseInt(params.page || '1');

  const res = await fetch(`${BASE_URL}/api/books?search=${encodeURIComponent(search)}&page=${page}`);

  if (!res.ok) {
    return <div>책을 찾을 수 없습니다.</div>
  }
  const { data: { booksData, currentPage, totalPage } }: WholeProps = await res.json();



  return (
    <div className="mt-28">
      <BookPages booksData={booksData} currentPage={currentPage} totalPage={totalPage} />
    </div>
  );
}
