import { MinusIcon, XIcon, Maximize2 } from "lucide-react";

export function TitleBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-2">
        <img src="/axel-logo.png" alt="Axel" className="w-6 h-6" />
        <span className="text-white/80 text-sm font-medium">Axel Setup</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <MinusIcon className="w-4 h-4 text-white/60" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <Maximize2 className="w-4 h-4 text-white/60" />
        </button>
        <button className="p-2 hover:bg-red-500/20 rounded-md transition-colors">
          <XIcon className="w-4 h-4 text-white/60" />
        </button>
      </div>
    </div>
  );
}
