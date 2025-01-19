import React, { useState } from "react";
import axios from "axios";
import { ButtonComponent, Input, Select } from "../components/component.js";

const DocumentUploadForm = ({ userId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handle document name change
  const handleDocumentNameChange = (e) => {
    setDocumentName(e.target.value);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentName || !file) {
      alert("Please select a document type and upload a file!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("documentName", documentName);
      formData.append("file", file);
      formData.append("userId", userId);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/uploadDocument",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Add uploaded file to the list
      setUploadedFiles((prev) => [
        ...prev,
        { name: documentName, file: file },
      ]);

      alert("Document uploaded successfully!");
      setDocumentName("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading document:", error.response?.data || error.message);
      alert("Failed to upload document. Please try again.");
    }
  };

  // Handle file deletion
  const handleDeleteFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="document-upload-form">
      <ButtonComponent onClick={toggleMenu} type="button">
        Add Files
      </ButtonComponent>

      {isMenuOpen && (
        <div className="mt-4 space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Select
              label="Document Type"
              options={["", "LC", "Cast Certificate"]}
              value={documentName}
              onChange={handleDocumentNameChange}
            />
            <Input
              label="Document File"
              type="file"
              onChange={handleFileChange}
            />
            <ButtonComponent type="submit">Upload Document</ButtonComponent>
          </form>

          {/* Display uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files mt-4">
              <h3 className="font-bold">Uploaded Files:</h3>
              <ul className="list-disc list-inside">
                {uploadedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center"
                  >
                    {file.name} ({file.file.name})
                    <ButtonComponent
                      onClick={() => handleDeleteFile(index)}
                      className="text-red-500 hover:underline ml-2"
                    >
                      Delete
                    </ButtonComponent>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentUploadForm;
