'use client'
import { Menu } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={toggleOpen}
      onMouseLeave={toggleOpen}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
    >
      <Menu size={35} />
      <DropdownMenu isOpen={isOpen} />
    </motion.div>
  );
}