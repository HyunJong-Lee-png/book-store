'use client';
import { BookOriginal } from '@/types/books';
import { Book } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StatsPage() {
  const [books, setBooks] = useState<BookOriginal[]>([]);

  useEffect(() => {
    (async function () {
      const res = await (await fetch('/api/books')).json();
      const books = res.data;
      setBooks(books);
    })()
  }, []);

  // Top5 정렬
  const top5Books = [...books].sort((a, b) => b.salesVolume - a.salesVolume).slice(0, 5);

  return (
    <div className="max-w-md mx-auto mt-28">
      <h1 className="text-2xl font-bold mb-4 text-center">{'<판매 통계>'}</h1>

      {/* 인기 도서 TOP 5 */}
      <h2 className="text-lg font-semibold mb-2 text-center">인기 도서 TOP 5</h2>

      <ul>
        {top5Books.map((book, index) => (
          <li key={book.id} className="border p-2 mb-1 rounded-lg">
            {index + 1}. {book.title} (저자:{book.author}) - <span className='text-blue-500 font-bold'>판매량: <span className='text-red-500'>{book.salesVolume}권</span></span>
          </li>
        ))}
      </ul>

      {/* 판매량 차트 */}
      <h2 className="text-lg font-semibold mt-6 mb-2 flex items-center"><Book />전체 도서 판매량</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={books}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="salesVolume" fill="#63609f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
