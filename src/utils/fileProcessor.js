// File processing utilities for document analysis

export const extractTextFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        
        if (file.type === "application/pdf") {
          // In a real app, you would use pdf-parse here
          // For demo purposes, return mock text
          resolve(`Extracted text from PDF: ${file.name}\n\nThis is sample extracted content from the PDF document. In a production environment, this would contain the actual text content extracted using pdf-parse library.`);
        } else if (file.name.endsWith(".docx")) {
          // In a real app, you would use mammoth here
          resolve(`Extracted text from Word document: ${file.name}\n\nThis is sample extracted content from the Word document. In a production environment, this would contain the actual text content extracted using mammoth library.`);
        } else {
          // For other text-based files
          const text = new TextDecoder().decode(arrayBuffer);
          resolve(text);
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};

export const validateFileType = (file, allowedTypes = [".pdf", ".docx", ".doc", ".txt"]) => {
  const extension = "." + file.name.split(".").pop().toLowerCase();
  return allowedTypes.includes(extension);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const generateFileId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};