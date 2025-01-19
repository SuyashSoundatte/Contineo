import React, { useState } from "react";
import axios from "axios";

const DocumentUploadForm = ({ userId, isDisabled }) => {
  const [documents, setDocuments] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setDocuments(event.target.files);
  };

  const handleUpload = async () => {
    if (!documents.length) {
      setUploadStatus("Please select a document to upload.");
      return;
    }

    const formData = new FormData();
    Array.from(documents).forEach((file) => {
      formData.append("documents", file);
    });
    formData.append("userId", userId);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/uploadDocuments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("Documents uploaded successfully!");
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Error uploading documents:", error);
      setUploadStatus("Failed to upload documents. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={isDisabled}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={isDisabled}
        className={`px-6 py-3 text-white font-semibold rounded-lg ${
          isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Upload Documents
      </button>
      {uploadStatus && <p className="text-sm text-gray-700">{uploadStatus}</p>}
    </div>
  );
};

export default DocumentUploadForm;
