import React, { useState } from "react";
import axios from "axios";

const DocumentUploadForm = ({ userId, name, isDisabled }) => {
  const [documents, setDocuments] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const selectedFileNames = selectedFiles.map((file) => file.name);

    // Append new files without duplicating existing ones
    setDocuments((prevDocs) => [...prevDocs, ...selectedFiles]);
    setFileNames((prevNames) => [...prevNames, ...selectedFileNames]);
  };

  const handleUpload = async () => {
    if (!documents.length) {
      setUploadStatus("Please select at least one document to upload.");
      return;
    }

    const formData = new FormData();
    documents.forEach((file) => {
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
      setDocuments([]); // Clear the file list after successful upload
      setFileNames([]);
    } catch (error) {
      console.error("Error uploading documents:", error);
      setUploadStatus("Failed to upload documents. Please try again.");
    }
  };

  const handleRemoveFile = (index) => {
    setDocuments((prevDocs) => prevDocs.filter((_, i) => i !== index));
    setFileNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Display userId */}
      <div className="text-sm text-gray-700">
        <strong>User ID:</strong> {userId}
        <br />
        <strong>Name :</strong> {name}
      </div>

      {/* File Input */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={isDisabled}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {/* File List */}
      {fileNames.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Selected Files:</h3>
          <ul className="list-disc list-inside">
            {fileNames.map((name, index) => (
              <li key={index} className="flex justify-between items-center">
                {name}
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:underline ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={isDisabled || documents.length === 0}
        className={`px-6 py-3 text-white font-semibold rounded-lg ${
          isDisabled || documents.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Upload Documents
      </button>

      {/* Upload Status */}
      {uploadStatus && <p className="text-sm text-gray-700">{uploadStatus}</p>}
    </div>
  );
};

export default DocumentUploadForm;
