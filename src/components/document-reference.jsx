import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export function DocumentReference({
  documents = []
}) {
  return (
    (<div className="pl-4 border-l-2 border-gray-800 ml-4 space-y-2">
      <p className="text-sm text-gray-400">Referenced Documents:</p>
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 text-sm bg-gray-800/30 p-2 rounded-md hover:bg-gray-800/50 transition-colors group cursor-pointer">
          <FileText
            className="w-4 h-4 text-[#00ff9d] group-hover:text-[#00ffff] transition-colors" />
          <span className="group-hover:text-[#00ffff] transition-colors">{doc.title}</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00ff9d] group-hover:bg-[#00ffff] transition-colors"
                initial={{ width: 0 }}
                animate={{ width: `${doc.relevance}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }} />
            </div>
            <span
              className="text-xs text-[#00ff9d] group-hover:text-[#00ffff] transition-colors">
              {doc.relevance}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>)
  );
}

