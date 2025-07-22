import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FileUpload = ({ onFileUpload, multiple = false, accept = ".pdf,.docx" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    setUploading(true);
    const fileArray = Array.from(files);
    
    // Validate file types
    const validTypes = [".pdf", ".docx", ".doc"];
    const invalidFiles = fileArray.filter(file => {
      const extension = "." + file.name.split(".").pop().toLowerCase();
      return !validTypes.includes(extension);
    });

    if (invalidFiles.length > 0) {
      toast.error("Please upload only PDF or Word documents");
      setUploading(false);
      return;
    }

    try {
      // Process files and extract text
      const processedFiles = await Promise.all(
        fileArray.map(async (file) => {
          const fileData = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            content: await extractTextFromFile(file),
            uploadedAt: new Date()
          };
          return fileData;
        })
      );

      onFileUpload(multiple ? processedFiles : processedFiles[0]);
      toast.success(`${fileArray.length} file(s) uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const extractTextFromFile = async (file) => {
    // For demo purposes, return mock extracted text
    // In a real app, you'd use pdf-parse or mammoth here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Extracted text content from ${file.name}. This is a placeholder for the actual document content that would be extracted using appropriate libraries.`);
      }, 1000);
    });
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
          dragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400"
        } ${uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : (
              <ApperIcon name="Upload" className="w-6 h-6 text-blue-600" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 mb-1">
              {uploading ? "Processing..." : "Upload documents"}
            </p>
            <p className="text-sm text-gray-600">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supports PDF and Word documents
            </p>
          </div>
          
          <Button variant="secondary" size="sm" disabled={uploading}>
            <ApperIcon name="FolderOpen" className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;