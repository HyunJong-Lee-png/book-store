'use client'
import { Dispatch, SetStateAction } from "react";

export default function BookSort({ setHowToSort }: { setHowToSort: Dispatch<SetStateAction<string>> }) {

  return (
    <div className="flex gap-8 justify-center items-center text-xl py-10">
      <div className="cursor-pointer hover:text-blue-500" onClick={() => setHowToSort('latest')}>최신순</div>
      <div className="cursor-pointer hover:text-blue-500" onClick={() => setHowToSort('popular')}>인기순</div>
      <div className="cursor-pointer hover:text-blue-500" onClick={() => setHowToSort('price')}>가격순</div>
    </div>
  );

}