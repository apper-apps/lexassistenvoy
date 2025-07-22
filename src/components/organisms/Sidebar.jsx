import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationItem from "@/components/molecules/NavigationItem";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      to: "/comparison",
      icon: "GitCompare",
      label: "Contract Comparison",
      description: "Compare contracts and analyze differences"
    },
    {
      to: "/risk-assessment",
      icon: "Shield",
      label: "Risk Assessment",
      description: "Identify potential risks and issues"
    },
    {
      to: "/tldr",
      icon: "FileText",
      label: "TLDR",
      description: "Get plain English summaries"
    },
    {
      to: "/clause-explainer",
      icon: "BookOpen",
      label: "Clause Explainer",
      description: "Understand complex legal clauses"
    },
    {
      to: "/document-creation",
      icon: "PlusCircle",
      label: "Document Creation",
      description: "Generate legal documents"
    }
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 shadow-lg">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <ApperIcon name="Scale" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LexAssist</h1>
              <p className="text-sm text-gray-500">Legal Assistant for Founders</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavigationItem key={item.to} {...item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            AI-powered legal assistance
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <ApperIcon name="Scale" className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900">LexAssist</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileOpen(true)}
        >
          <ApperIcon name="Menu" className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <ApperIcon name="Scale" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">LexAssist</h1>
                    <p className="text-sm text-gray-500">Legal Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navigationItems.map((item) => (
                  <div key={item.to} onClick={() => setIsMobileOpen(false)}>
                    <NavigationItem {...item} />
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;