'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomepageLogo() {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
    >
      <Link href={'/'} className="flex items-center gap-5">
        <Image src="/logo.jpg" alt="현종문고" width={100} height={120} priority className="rounded-lg w-auto h-auto" />
        <span className="text-2xl md:text-4xl font-bold font-sans">현종문고</span>
      </Link>
    </motion.div>
  );
}