"use client"

import { useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { Chat } from "@/components/chat"
import { Header } from "@/components/header"
import { AnimatePresence } from "framer-motion"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    (<div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <div
            key="chat"
            className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <Header />
            <main className="container mx-auto p-4">
              <Chat />
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>)
  );
}

