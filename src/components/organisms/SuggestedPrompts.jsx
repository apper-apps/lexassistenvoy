import { motion } from "framer-motion";
import SuggestedPrompt from "@/components/molecules/SuggestedPrompt";

const SuggestedPrompts = ({ toolType, onPromptClick }) => {
  const getPromptsForTool = (tool) => {
    const prompts = {
      comparison: [
        { text: "Compare two vendor contracts", icon: "GitCompare" },
        { text: "Show me the key differences", icon: "Search" },
        { text: "Analyze pricing terms", icon: "DollarSign" },
        { text: "Check for hidden clauses", icon: "Eye" }
      ],
      "risk-assessment": [
        { text: "Identify potential risks in this contract", icon: "Shield" },
        { text: "Find ambiguous terms", icon: "AlertTriangle" },
        { text: "Check for hidden costs", icon: "DollarSign" },
        { text: "Review timeline obligations", icon: "Clock" }
      ],
      tldr: [
        { text: "Summarize this document in plain English", icon: "FileText" },
        { text: "Create bullet points summary", icon: "List" },
        { text: "Translate legal jargon", icon: "Languages" },
        { text: "Explain the main points", icon: "MessageSquare" }
      ],
      "clause-explainer": [
        { text: "Explain this clause in simple terms", icon: "BookOpen" },
        { text: "Why is this clause important?", icon: "HelpCircle" },
        { text: "What are the implications?", icon: "Target" },
        { text: "Show related clauses", icon: "Link" }
      ],
      "document-creation": [
        { text: "Create a privacy policy", icon: "Shield" },
        { text: "Generate terms of service", icon: "FileText" },
        { text: "Draft an invoice template", icon: "Receipt" },
        { text: "Create a disclaimer", icon: "AlertCircle" }
      ]
    };

    return prompts[tool] || [
      { text: "Upload a document to get started", icon: "Upload" },
      { text: "Ask me about legal matters", icon: "MessageSquare" },
      { text: "Get help with contracts", icon: "FileText" },
      { text: "Analyze legal documents", icon: "Search" }
    ];
  };

  const prompts = getPromptsForTool(toolType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {prompts.map((prompt, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SuggestedPrompt
            prompt={prompt.text}
            icon={prompt.icon}
            onClick={onPromptClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SuggestedPrompts;