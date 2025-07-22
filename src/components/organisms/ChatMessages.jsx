import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";

const ChatMessages = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex gap-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Scale" className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-2xl ${
              message.role === "user" ? "order-first" : ""
            }`}>
              <div className={`p-4 rounded-2xl shadow-sm ${
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-white border border-gray-200"
              }`}>
                <div className="prose prose-sm max-w-none">
                  {message.content.split("\n").map((line, index) => (
                    <p key={index} className={`${
                      message.role === "user" ? "text-white" : "text-gray-900"
                    } ${index === 0 ? "mt-0" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.attachments.map((file, index) => (
                      <div key={index} className={`flex items-center gap-2 text-sm ${
                        message.role === "user" ? "text-blue-100" : "text-gray-600"
                      }`}>
                        <ApperIcon name="Paperclip" className="w-4 h-4" />
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className={`text-xs text-gray-500 mt-2 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}>
                {format(message.timestamp, "HH:mm")}
              </div>
            </div>
            
            {message.role === "user" && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <ApperIcon name="User" className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {loading && <Loading variant="typing" />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;