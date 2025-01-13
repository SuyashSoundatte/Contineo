import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import Input from './Input';

const AddFiles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fileName, setFileName] = useState('');
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
  const handleAddFile = () => {
    if (fileName && file) {
      const newFile = { name: fileName, file };
      setUploadedFiles((prev) => [...prev, newFile]);
      setFileName(''); // Clear file name input
      setFile(null); // Clear file input
    } else {
      alert('Please provide both file name and file.');
    }
  };

  return (
    <>
      <ButtonComponent onClick={handleClick} type="button">
        Add Files
      </ButtonComponent>
      {isMenuOpen && (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-center items-center gap-4">
            <Input
              type="text"
              name="fileName"
              placeholder="Enter File Name"
              value={fileName}
              onChange={handleFileNameChange}
            />
            <Input
              type="file"
              name="file"
              placeholder=""
              onChange={handleFileChange}
            />
            <ButtonComponent type="button" onClick={handleAddFile}>
              Add
            </ButtonComponent>
          </div>
          {/* Display uploaded files */}
          <div className="mt-4">
            <h3 className="font-bold">Uploaded Files:</h3>
            <ul className="list-disc list-inside">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  {file.name} ({file.file.name})
                  <button
                    onClick={() =>
                      setUploadedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-500 hover:underline ml-2"
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
