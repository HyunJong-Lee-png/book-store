'use client'
import Book from "./Book";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { WholeProps } from "@/app/page";
import { useRouter } from "next/navigation";
import BookSort from "./BookSort";
import { useState } from "react";

type Props = { searchParam: string } & WholeProps['data']

export default function BookPages({ booksData, currentPage, totalPage, searchParam }: Props) {
  const router = useRouter();
  const [howToSort, setHowToSort] = useState('latest');
  const handlePagenation = (direction: string) => {
    const search = searchParam ? `search=${searchParam}` : "";
    const newPage = direction === 'right'
      ? Math.min(currentPage + 1, totalPage)
      : Math.max(currentPage - 1, 1);

    router.push(`/?${[search, `page=${newPage}`].filter(Boolean).join('&')}`);
  }

  return (
    <>
      <BookSort setHowToSort={setHowToSort} />
      <div className="max-w-4xl mx-auto">
        <div className=" grid grid-rows-[repeat(3,minmax(0px,200px))] grid-cols-3 gap-5 cursor-pointer">
          {booksData.sort((a, b) => (
            howToSort === 'latest' ?
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() :
              howToSort === 'popular' ?
                b.salesVolume - a.salesVolume :
                b.price - a.price
          )).map(data => (
            <Book key={data.id}{...data} />))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-3 my-8">
          <button
            className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'opacity-50' : ''}`}
            onClick={() => handlePagenation('right')}
            disabled={currentPage === 1}
          >
            <ArrowBigLeft fill="black" />
          </button>
          <div>
            {`${currentPage} / ${totalPage}`}
          </div>
          <button
            className={`px-4 py-2 border rounded-md ${currentPage === totalPage ? 'opacity-50' : ''}`}
            onClick={() => handlePagenation('left')}
            disabled={currentPage === totalPage}
          >
            <ArrowBigRight fill="black" />
          </button>
        </div>

      </div>
    </>

  );
}