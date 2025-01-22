import { motion } from "framer-motion";

export function Background() {
  return (
    <>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 255, 157, 0.2) 0%, rgba(0, 255, 255, 0.2) 100%)",
        }}
      />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(0, 255, 157, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(0, 255, 255, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(0, 255, 157, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />
    </>
  );
}
