'use client'

import { TypeBook } from "@/types/books";
import { makePublishedDate } from "@/util/makePublishedDate";
import { useState } from "react";
import BookUpdate from "./BookEdit";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BookDetail({ foundBook }: { foundBook: TypeBook }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (foundBook.stockQuantity) {
      const boolean = confirm('아직 남아있는 재고가 있습니다. 정말 삭제하시겠습니까?');
      if (boolean) {
        const res = await fetch(`/api/books/${foundBook.id}`, {
          method: 'DELETE'
        });
        if (!res.ok) {
          toast.error('삭제 실패..');
          router.push('/')
        } else {
          toast.success('성공적으로 삭제되었습니다!');
          router.push('/')
        }
      }
    } else {
      const res = await fetch(`/api/books/${foundBook.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        toast.error('삭제 실패..')
        router.push('/')
      } else {
        toast.success('성공적으로 삭제되었습니다!')
        router.push('/')
      }
    }
  }

  const testBuy = async () => {
    if (!foundBook.stockQuantity) {
      toast.error('재고가 없습니다.');
      return;
    }
    const res = await fetch(`/api/books/${foundBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          salesVolume: foundBook.salesVolume + 1,
          stockQuantity: Math.max(foundBook.stockQuantity - 1, 0)
        })
    });
    if (!res.ok) {
      toast.error('구매에 문제가 생겼습니다.');
      router.refresh();
    } else {
      toast.success('구매 성공!');
      router.refresh();
    }
  }

  return (
    <div className="w-full border shadow-md rounded-md flex p-10 max-h-[680px] gap-10">
      <motion.div
        className={`py-10 bg-gray-100 h-[600px] `}
        initial={{ flex: 1 }}
        animate={{ flex: isOpen ? 1 / 2 : 1, transformOrigin: 'left center' }}
      >
        {foundBook.image
          ? <Image src={`${foundBook.image}`} width={400} height={600} alt={foundBook.title} />
          : <div className="w-full h-full flex justify-center items-center font-bold text-3xl">No Image</div>}
      </motion.div>

      <motion.div
        className="p-4 space-y-10"
        initial={{ flex: 1 }}
        animate={{ flex: isOpen ? 1 / 2 : 1, transformOrigin: 'left center' }}
      >
        {/* 책 상제정보 */}
        <div className="space-y-5 text-lg">
          <h1 >제목: {foundBook?.title}</h1>
          <h3 >작가: {foundBook?.author}</h3>
          <h3 >출판일: {foundBook && makePublishedDate(foundBook.publishedDate)}</h3>
          <h1 className="text-red-500">가격: {foundBook.price}원</h1>
          <h1 className="text-blue-400">재고량: {foundBook.stockQuantity}개</h1>
          <h1 className="text-red-500">판매량: {foundBook.salesVolume}개</h1>
        </div>
        {/* 책 편집,삭제 */}
        <div className="flex gap-5 text-center">
          <div
            className="w-16 p-2 bg-blue-400 rounded-lg text-white hover:bg-blue-500 cursor-pointer"
            onClick={() => setIsOpen(prev => !prev)}
          >
            편집
          </div>
          <div
            className="w-16 p-2 bg-red-400 rounded-lg text-white hover:bg-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            삭제
          </div>
        </div>
        {/* 테스트 구매버튼 */}
        <button onClick={testBuy} className="w-full py-2 px-4 font-bold bg-black text-white rounded-lg">테스트 구매</button>
      </motion.div>
      {/* 편집버튼 클릭시 편집페이지 생성 */}
      <AnimatePresence>
        {isOpen &&
          <BookUpdate foundBook={foundBook} />}
      </AnimatePresence>
    </div>
  );
}