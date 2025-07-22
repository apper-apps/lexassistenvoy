import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import ChatMessages from "@/components/organisms/ChatMessages";
import SuggestedPrompts from "@/components/organisms/SuggestedPrompts";
import MessageInput from "@/components/molecules/MessageInput";
import FileUpload from "@/components/molecules/FileUpload";
import { Card, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import conversationService from "@/services/api/conversationService";

const ChatInterface = () => {
  const { toolType = "general" } = useParams();
const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [promptTriggeredUpload, setPromptTriggeredUpload] = useState(false);

  useEffect(() => {
    initializeConversation();
  }, [toolType]);

  const initializeConversation = async () => {
    try {
      const newConversation = await conversationService.create({
        toolType,
        messages: []
      });
      setConversation(newConversation);
    } catch (error) {
      console.error("Error initializing conversation:", error);
      toast.error("Failed to initialize conversation");
    }
  };

  const handleSendMessage = async (content, attachments = []) => {
    if (!conversation) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content,
      attachments,
      timestamp: new Date()
    };

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }));

    setLoading(true);

    try {
      // Simulate AI response based on tool type and content
      const aiResponse = await generateAIResponse(toolType, content, attachments);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };

      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage]
      }));

      // Update conversation in service
      await conversationService.update(conversation.id, {
        messages: [...conversation.messages, userMessage, assistantMessage]
      });

} catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get AI response. Please try again or check your connection.");
      
      // Add a fallback response for better user experience
      const fallbackMessage = {
        id: Date.now() + 2,
        role: "assistant", 
        content: "I apologize, but I'm having trouble connecting right now. Please try uploading your document again or refresh the page. If the problem persists, you can still use the suggested prompts below to get started.",
        timestamp: new Date()
      };
      
      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, fallbackMessage]
      }));
} finally {
      setLoading(false);
    }
  };

  const generateAIResponse = async (tool, message, files = []) => {
    try {
      // Simulate API delay with potential timeout
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          // Simulate random API failures (10% chance)
          if (Math.random() < 0.1) {
            reject(new Error("API timeout"));
          } else {
            resolve();
          }
        }, 1500);
      });

      const responses = {
        comparison: `I'll help you compare these contracts. Based on your request "${message}", I can analyze the following aspects:
• **Key Differences**: I'll identify structural and content differences between contracts
• **Pricing Terms**: Compare costs, payment schedules, and fee structures  
• **Legal Obligations**: Highlight different responsibilities and requirements
• **Risk Assessment**: Flag potential concerns in each contract

${files.length > 0 ? `I've received ${files.length} document(s) for analysis. Let me examine the content and provide a detailed comparison.` : "Please upload the contracts you'd like me to compare."}

Would you like me to focus on any specific aspects of the comparison?`,

      "risk-assessment": `I'll analyze your document for potential risks. Here's what I'm checking for:

**🔍 Risk Analysis Results:**

• **Ambiguous Terms**: Found 3 clauses that need clarification
• **Hidden Costs**: Identified potential additional fees in Section 4.2
• **Timeline Risks**: Delivery obligations may conflict with payment terms
• **Liability Issues**: Limited liability clause heavily favors the other party

**⚠️ Key Concerns:**
- Termination clause allows for immediate cancellation without cause
- Intellectual property rights are not clearly defined
- Force majeure provisions are quite broad

${files.length > 0 ? "Based on the uploaded document, I recommend reviewing these specific sections before signing." : "Upload your contract for a detailed risk assessment."}`,

      tldr: `Here's a plain English summary of your document:

**📋 TLDR Summary:**

• **Main Purpose**: ${message.includes("privacy") ? "Privacy Policy - How your data is collected and used" : "Legal agreement outlining terms and conditions"}
• **Key Points**: 
  - Your rights and responsibilities
  - How disputes will be handled  
  - What happens if things go wrong
  - Payment and delivery terms

**🔑 Bottom Line**: 
This is a standard agreement with some important clauses about liability and termination. The terms are generally fair but pay attention to the cancellation policy.

**⚡ Quick Translation**: 
"We'll provide the service, you'll pay for it, and if either of us breaks the rules, here's how we'll handle it."

Would you like me to explain any specific section in more detail?`,

      "clause-explainer": `Let me break down this legal clause for you:

**📖 Clause Explanation:**

**What it says**: "${message}"

**In Plain English**: 
This clause means that both parties need to give 30 days written notice before ending the agreement. It's basically a "cooling off" period to prevent sudden termination.

**Why it's important**:
• Protects both parties from sudden contract termination
• Gives time to find alternatives or resolve issues
• Standard practice in business agreements

**Other references in the document**:
• Section 3.4 mentions dispute resolution procedures
• Section 7.1 discusses breach of contract remedies
• Appendix B contains the notice requirements template

**💡 Practical Impact**: 
This gives you a safety net - no one can just walk away immediately if there's a problem.`,

      "document-creation": `I'll help you create professional legal documents. Based on your request for "${message}", here's what I can generate:

**📄 Available Templates:**

• **Privacy Policy**: GDPR/CCPA compliant privacy policy
• **Terms of Service**: Comprehensive terms and conditions
• **Invoice Template**: Professional invoice with legal protections
• **Disclaimer**: Liability limitation and risk disclosure
• **Cookie Consent**: Cookie usage and consent management

**✨ Custom Generation Process:**
1. I'll ask you specific questions about your business
2. Generate a tailored document based on your needs
3. Include industry-specific clauses where relevant
4. Provide explanations for each section

**🎯 What I need from you:**
- Business type and location
- Specific requirements or concerns
- Industry regulations that apply

Ready to start creating your document? What type of business are you in?`,

      general: `Hello! I'm your AI legal assistant. I can help you with:

**🔧 Available Tools:**
• **Contract Comparison** - Compare agreements and find differences
• **Risk Assessment** - Identify potential legal risks and issues  
• **TLDR** - Get plain English summaries of complex documents
• **Clause Explainer** - Understand specific legal terms and clauses
• **Document Creation** - Generate legal documents and templates

**💡 How I can help:**
${message.toLowerCase().includes("contract") ? "I see you're asking about contracts. I can analyze, compare, or explain any contract terms." : "I can analyze legal documents, explain complex terms, and help you understand your legal obligations."}

What would you like to work on today? You can upload a document or select a tool from the sidebar to get started.`
};

      return responses[tool] || responses.general;
    } catch (error) {
      console.error("AI Response generation failed:", error);
      throw new Error("Unable to generate response at this time");
    }
  };
const handleFileUpload = async (files) => {
    const filesArray = Array.isArray(files) ? files : [files];
    const message = `I've uploaded ${filesArray.length} document(s). Please analyze ${filesArray.length === 1 ? 'it' : 'them'}.`;
    await handleSendMessage(message, filesArray);
    setShowUpload(false);
    setPromptTriggeredUpload(false);
  };

  const handlePromptClick = async (prompt) => {
    // Send the prompt message first
    await handleSendMessage(prompt);
    
    // For prompts that typically need file analysis, suggest file upload
    const uploadePrompts = [
      "Compare two vendor contracts",
      "Identify potential risks in this contract", 
      "Summarize this document in plain English",
      "Explain this clause in simple terms"
    ];
    
    if (uploadePrompts.some(p => prompt.includes(p.split(' ').slice(0, 3).join(' ')))) {
      setPromptTriggeredUpload(true);
      setShowUpload(true);
      toast.info("Upload your document to get a detailed analysis");
    }
  };

  const getToolTitle = (tool) => {
    const titles = {
      comparison: "Contract Comparison",
      "risk-assessment": "Risk Assessment",
      tldr: "TLDR Generator",
      "clause-explainer": "Clause Explainer",
      "document-creation": "Document Creation",
      general: "Legal Assistant"
    };
    return titles[tool] || "Legal Assistant";
  };

  const getToolDescription = (tool) => {
    const descriptions = {
      comparison: "Compare contracts, analyze differences, and evaluate terms side by side",
      "risk-assessment": "Identify potential risks, hidden costs, and ambiguous terms in your contracts",
      tldr: "Get plain English summaries and bullet point breakdowns of complex legal documents",
      "clause-explainer": "Understand specific clauses, their implications, and why they matter",
      "document-creation": "Generate professional legal documents including policies, terms, and templates",
      general: "AI-powered legal assistance for founders and entrepreneurs"
    };
    return descriptions[tool] || "AI-powered legal assistance for founders and entrepreneurs";
  };

  if (!conversation) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getToolTitle(toolType)}</h1>
            <p className="text-gray-600 mt-1">{getToolDescription(toolType)}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Upload" className="w-4 h-4" />
              Upload Files
            </Button>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      {showUpload && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white border-b border-gray-200 p-6"
        >
          <FileUpload onFileUpload={handleFileUpload} multiple={toolType === "comparison"} />
        </motion.div>
      )}

      {/* Chat Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {conversation.messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <Empty
              title={`Welcome to ${getToolTitle(toolType)}`}
              description={getToolDescription(toolType)}
              icon="Scale"
              className="mb-8"
            />
            
            <Card className="w-full max-w-4xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Actions</h3>
<SuggestedPrompts 
                  toolType={toolType} 
                  onPromptClick={handlePromptClick}
                />
              </CardContent>
            </Card>
          </div>
) : (
          <ChatMessages messages={conversation.messages} loading={loading} />
        )}
      </div>
      
      {/* Message Input - Positioned with better desktop spacing */}
      <div className="bg-white border-t border-gray-200 mb-4 mx-4 rounded-lg shadow-sm">
        <MessageInput
          onSend={(message) => handleSendMessage(message)}
          disabled={loading}
          placeholder={`Ask about ${getToolTitle(toolType).toLowerCase()}...`}
        />
      </div>
    </div>
  );
};

export default ChatInterface;