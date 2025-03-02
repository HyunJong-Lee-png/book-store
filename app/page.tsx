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
  const { search, page } = await searchParams;
  let res: Response;
  if (!search) {
    res = await fetch(`${BASE_URL}/api/books?${page ? `page=${parseInt(page)}` : `page=1`}`);
  } else {
    res = await fetch(`${BASE_URL}/api/books?search=${search}&${page ? `page=${parseInt(page)}` : `page=1`}`);
  }

  // const search = params.search || '';
  // const page = parseInt(params.page || '1');
  // const searchParam = search ? `search=${encodeURIComponent(search)}` : "";
  // const pageParam = `page=${page}`;

  // // 최종 URL
  // const url = `${BASE_URL}/api/books?${[searchParam, pageParam].filter(Boolean).join("&")}`;
  // const res = await fetch(url);

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
