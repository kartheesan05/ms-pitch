import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalStep({ isReady, onComplete }) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Meet your new
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
            onboarding assistant.
          </span>
        </h1>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.8 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full 
          bg-[#00ff9d] text-black font-medium transition-all duration-200
          hover:bg-[#00ffff] hover:shadow-[0_0_20px_rgba(0,255,157,0.5)]
          ${isReady ? "cursor-pointer" : "cursor-default opacity-50"}`}
        disabled={!isReady}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
