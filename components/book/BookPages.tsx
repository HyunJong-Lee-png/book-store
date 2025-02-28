'use client'
import { BookProps } from "@/types/books";
import Book from "./Book";
import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";


export default function BookPages({ books }: { books: BookProps[] }) {
  const [page, setPage] = useState(1);

  const limit = 9;
  const from = (page - 1) * limit;
  const to = from + limit;
  const totalPage = Math.ceil(books.length / limit);

  return (
    <div className="max-w-4xl mx-auto">
      <div className=" pt-10 grid grid-rows-[repeat(3,minmax(0px,200px))] grid-cols-3 gap-5 cursor-pointer">
        {books.slice(from, to).map(data => (
          <Book key={data.id}{...data} />))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-3 my-8">
        <button
          className={`px-4 py-2 border rounded-md ${page === 1 ? 'opacity-50' : ''}`}
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <ArrowBigLeft fill="black" />
        </button>
        <div>
          {`${page} / ${totalPage}`}
        </div>
        <button
          className={`px-4 py-2 border rounded-md ${page === totalPage ? 'opacity-50' : ''}`}
          onClick={() => setPage(prev => Math.min(prev + 1, totalPage))}
          disabled={page === totalPage}
        >
          <ArrowBigRight fill="black" />
        </button>
      </div>

    </div>
  );
}