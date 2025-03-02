import { TypeBook } from "@/types/books";
import { makePublishedDate } from "@/util/makePublishedDate";
import Image from "next/image";
import Link from "next/link";

export default function Book({ id, title, author, publishedDate, image, price }: TypeBook) {
  const date = makePublishedDate(publishedDate);
  return (
    <>
      <Link
        className="border rounded-lg grid grid-cols-2  p-3"
        href={`/books/${id}`}
      >
        <div className="w-[80px] h-[110px] relative p-1 bg-gray-400 shadow-md rounded-sm place-self-center overflow-hidden">
          {image ?
            <Image
              src={image}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={title}
            />
            : <div className="w-full h-full p-2 flex justify-center items-center text-sm font-bold  bg-white">이미지를 등록하세요.</div>}
        </div>
        <div className="flex flex-col gap-3 p-2 justify-center">
          <h1 className="text-base font-bold overflow-hidden truncate">{title}</h1>
          <h3 className="space-x-3 text-sm text-gray-400 truncate"><span >{author} 저</span></h3>
          <h3 className="space-x-2 text-sm text-gray-400 truncate">{date}</h3>
          <h1 className="text-sm font-bold text-red-500 truncate">{price.toLocaleString()}원</h1>
        </div>
      </Link>
    </>

  );
}