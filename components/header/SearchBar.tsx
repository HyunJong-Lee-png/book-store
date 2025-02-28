'use client'
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function SearchBar() {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value) return;
    //네비게이션 바에서 검색값을 홈페이지에 searchParams를 이용해 전달
    router.push(`/?search=${value}`);
    setValue('')
  }
  return (
    <motion.form
      className="min-w-[300px] relative"
      onSubmit={handleSubmit}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
    >
      <input
        className=" w-full outline-none rounded-md py-2 pl-4 pr-16 border-2 bg-white text-black placeholder-gray-400"
        placeholder="도서명 혹은 저자입력.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="absolute top-1/2 -translate-y-1/2 right-2" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="size-5 hover:fill-blue-500">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
        </svg>
      </button>
    </motion.form>
  );
}