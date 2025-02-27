"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // You can add any initialization logic here
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff] mb-8">
          Axel Onboarding Assistant
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Your personalized AI guide to help you navigate your first days at the company.
          Get answers to your questions and complete your onboarding tasks.
        </p>
        <Button
          onClick={() => router.push('/main')}
          className="bg-[#00ff9d] hover:bg-[#00ff9d]/90 text-black font-medium text-lg py-6 px-8"
        >
          Start Onboarding
        </Button>
      </motion.div>
    </div>
  );
}
