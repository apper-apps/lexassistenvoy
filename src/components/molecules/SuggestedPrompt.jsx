import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SuggestedPrompt = ({ prompt, icon, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="ghost"
        onClick={() => onClick(prompt)}
        className="w-full justify-start text-left p-4 h-auto bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <ApperIcon name={icon} className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-gray-700 font-medium">{prompt}</span>
        </div>
      </Button>
    </motion.div>
  );
};

export default SuggestedPrompt;