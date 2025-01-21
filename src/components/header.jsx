"use client"

import { Terminal } from "lucide-react"
import { motion } from "framer-motion"

export function Header() {
  return (
    (<motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center gap-2">
        <Terminal className="w-6 h-6 text-[#00ff9d]" />
        <h1
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
          Axel
        </h1>
      </div>
    </motion.header>)
  );
}

