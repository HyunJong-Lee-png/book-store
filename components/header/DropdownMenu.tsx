'use client'
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    id: 'add',
    title: '도서 추가',
    link: '/books/add'
  },
  {
    id: 'stats',
    title: '도서 통계',
    link: '/books/stats'
  }
];

export default function DropdownMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen &&
        <motion.ul
          className="absolute top-full right-0 min-w-40 rounded-md shadow-lg py-2 text-nowrap z-10 bg-white"
          initial={{ opacity: 0, height: 0, }}
          animate={{ opacity: 1, height: 'auto', }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        // style={{ transformOrigin: 'top center' }}
        >
          {categories.map((category) => (
            <motion.li
              key={category.id}
              initial={{ opacity: 0, height: 0, }}
              animate={{ opacity: 1, height: 'auto', }}
              exit={{ opacity: 0, height: 0 }}>
              <Link
                href={category.link}
                className="block relative py-2 px-4 hover:text-blue-500 hover:bg-gray-100 before:content-[''] before:absolute before:block before:w-1 before:h-1 before:rounded-full before:bg-red-600 before:top-[50%] before:translate-y-[-50%] before:left-4"
              >
                <span>{category.title}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>}
    </AnimatePresence>
  );
} 