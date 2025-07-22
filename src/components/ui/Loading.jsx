import { motion } from "framer-motion";

const Loading = ({ variant = "messages" }) => {
  if (variant === "messages") {
    return (
      <div className="space-y-4 p-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "typing") {
    return (
      <div className="flex items-center gap-2 px-4 py-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex gap-1 typing-dots">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default Loading;