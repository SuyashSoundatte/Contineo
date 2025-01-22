import React, { useState } from "react";
import axios from "axios";
import {
  ButtonComponent,
  Input,
  Select,
} from "./component.js";

const AddFiles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClose = () => {
    setIsMenuOpen(false);
  };
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !fileName || !user_id) {
      alert("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      const jsonData = JSON.stringify({ fileName, teacherId });
      formData.append("jsonData", jsonData); 
      formData.append("file", file); 
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
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
            <Select label='Document Name' options={["document Name","LC", "Cast Certificate"]} />
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
          <div className='mt-4'>
            <h3 className='font-bold'>Uploaded Files:</h3>
            <ul className='list-disc list-inside'>
              {uploadedFiles.map((file, index) => (
                <li key={index} className='flex justify-between items-center'>
                  {file.name} ({file.file.name})
                  <ButtonComponent
                    onClick={() =>
                      setUploadedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className='text-red-500 hover:underline ml-2'
                  >
                    Delete
                  </ButtonComponent>
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
