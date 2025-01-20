import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentUploadForm = ({ userId, name, isDisabled }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [resetDocumentForm, setResetDocumentForm] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    // Validate file types and sizes
    const validFiles = selectedFiles.filter(file => {
      // Example validations (adjust as needed)
      const allowedTypes = [
        'image/jpeg', 
        'image/png', 
        'image/gif', 
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Invalid file type for ${file.name}. Allowed types are: JPEG, PNG, GIF, PDF, DOC, DOCX`);
        return false;
      }
      
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return false;
      }
      
      return true;
    });

    setFiles(prevFiles => {
      // Prevent duplicate files
      const uniqueNewFiles = validFiles.filter(
        newFile => !prevFiles.some(
          existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size
        )
      );
      return [...prevFiles, ...uniqueNewFiles];
    });
  };

  const handleUpload = async () => {
    if (!userId) {
      toast.error("User ID is required for document upload");
      return;
    }
  
    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }
  
    const formData = new FormData();
    
    // IMPORTANT: Use the exact field name expected by Multer
    files.forEach((file, index) => {
      formData.append("documents", file); // Changed from "file" to "documents"
    });
  
    // Optionally append userId if needed
    formData.append("userId", userId);
  
    try {
      setIsUploading(true);
      setUploadProgress(0);
  
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload", 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );
  
      // Success handling
      toast.success(response.data.message || "Documents uploaded successfully");
      
      // Reset files
      setFiles([]);
      setUploadProgress(0);
    } catch (error) {
      // Error handling
      const errorMessage = error.response?.data?.message || 
        "Failed to upload documents";
      
      toast.error(errorMessage);
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prevFiles => 
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleDocumentUploadReset = () => {
    setResetDocumentForm(true); // Trigger reset
    setTimeout(() => setResetDocumentForm(false), 0); // Reset the state after the form refreshes
  };


  return (
    <div className="space-y-4">
      {/* User Information */}
      <div className="text-sm text-gray-700 mb-4">
        <p><strong>User ID:</strong> {userId}</p>
        {name && <p><strong>Name:</strong> {name}</p>}
      </div>

      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={isDisabled || isUploading}
          className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 
            file:rounded-lg file:border-0 
            file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700 
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={index} 
                className="flex justify-between items-center 
                  bg-white p-2 rounded shadow-sm"
              >
                <span className="truncate mr-4">{file.name}</span>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  disabled={isUploading}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-sm text-center mt-2">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={isDisabled || files.length === 0 || isUploading}
        className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-colors duration-300 ${
          isDisabled || files.length === 0 || isUploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isUploading ? 'Uploading...' : 'Upload Documents'}
      </button>

      {/* Toast Notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}  

export default DocumentUploadForm;