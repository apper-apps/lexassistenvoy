import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const NavigationItem = ({ to, icon, label, description }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block p-4 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-start gap-3"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isActive ? "bg-white/20" : "bg-blue-100"
          }`}>
            <ApperIcon 
              name={icon} 
              className={`w-5 h-5 ${isActive ? "text-white" : "text-blue-600"}`} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-sm ${
              isActive ? "text-white" : "text-gray-900"
            }`}>
              {label}
            </h3>
            <p className={`text-xs mt-1 ${
              isActive ? "text-blue-100" : "text-gray-500"
            }`}>
              {description}
            </p>
          </div>
        </motion.div>
      )}
    </NavLink>
  );
};

export default NavigationItem;