'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomepageLogo() {

  const handleClick = () => {
    window.location.replace('/');
  }
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
    >
      <div onClick={handleClick} className="flex items-center gap-5 cursor-pointer">
        <Image src="/logo.jpg" alt="현종문고" width={100} height={120} priority className="rounded-lg w-auto h-auto" />
        <span className="text-2xl md:text-4xl font-bold font-sans">현종문고</span>
      </div>
    </motion.div>
  );
}