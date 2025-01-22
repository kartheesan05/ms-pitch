export function ProgressDots({ total, current }) {
  return (
    <div className="flex gap-2 mt-4">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            index === current
              ? "w-8 bg-gradient-to-r from-[#00ff9d] to-[#00ffff]"
              : index < current
              ? "w-4 bg-white/60"
              : "w-4 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}
