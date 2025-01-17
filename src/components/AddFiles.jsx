import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import Input from "./Input";
import axios from "axios";
import js from "@eslint/js";
import Select from "./Select";

const AddFiles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Toggle menu visibility
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu
  const handleClose = () => {
    setIsMenuOpen(false);
  };

  // Handle file name input change
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  // Add file to the uploadedFiles array
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !fileName || !user_id) {
      alert("All fields are required!");
      return;
    }

    try {
      // Create a FormData object
      const formData = new FormData();
      const jsonData = JSON.stringify({ fileName, teacherId }); // Convert the JSON data to a string
      console.log(formData, jsonData);

      formData.append("jsonData", jsonData); // Add JSON data as a string
      formData.append("file", file); // Add the file

      // Send data using axios
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the request is treated as multipart
          },
        }
      );

      console.log("Response:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <>
      <ButtonComponent onClick={handleClick} type='button'>
        Add Files
      </ButtonComponent>
      {isMenuOpen && (
        <div className='flex flex-col gap-4 mt-4'>
          <div className='relative flex justify-center items-center gap-4'>
            <Select label='Document Name' options={[,"Male", "Female"]} />
            <Input
              label = 'Document Name'
              type='file'
              name='file'
              placeholder=''
              onChange={handleFileChange}
            />
            <ButtonComponent className="absolute bottom-1 -right-24" onClick={handleClose}>
              Add
            </ButtonComponent>
          </div>
          {/* Display uploaded files */}
          <div className='mt-4'>
            <h3 className='font-bold'>Uploaded Files:</h3>
            <ul className='list-disc list-inside'>
              {uploadedFiles.map((file, index) => (
                <li key={index} className='flex justify-between items-center'>
                  {file.name} ({file.file.name})
                  <button
                    onClick={() =>
                      setUploadedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className='text-red-500 hover:underline ml-2'
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFiles;
