import React, { useState } from "react";
import { ButtonComponent, Input, Select } from "./component.js";

const AddSubjects = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [relatedTopic, setRelatedTopic] = useState("");
  const [subjects, setSubjects] = useState([]);

  // Toggle menu visibility
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu
  const handleClose = () => {
    setIsMenuOpen(false);
  };

  // Handle subject name input change
  const handleSubjectNameChange = (e) => {
    setSubjectName(e.target.value);
  };

  // Handle related topic selection change
  const handleRelatedTopicChange = (e) => {
    setRelatedTopic(e.target.value);
  };

  // Add subject to the subjects array
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subjectName) {
      alert("Subject name is required!");
      return;
    }

    const newSubject = {
      name: subjectName,
      topic: relatedTopic,
    };

    setSubjects((prev) => [...prev, newSubject]);
    setSubjectName("");
    setRelatedTopic("");
    // alert("Subject added successfully!");
  };

  return (
    <>
      <ButtonComponent onClick={handleClick} type='button'>
        Add Subject
      </ButtonComponent>
      {isMenuOpen && (
        <div className='flex flex-col gap-4 mt-4'>
          <div className='flex flex-col gap-2'>
            <Input
              label='Subject Name'
              type='text'
              name='subjectName'
              placeholder='Enter subject name'
              value={subjectName}
              onChange={handleSubjectNameChange}
            />
          </div>
          <ButtonComponent onClick={handleSubmit} type='submit'>
            Add Subject
          </ButtonComponent>
          <ButtonComponent onClick={handleClose} type='button'>
            Close
          </ButtonComponent>
          {/* Display added subjects */}
          <div className='mt-4'>
            <h3 className='font-bold'>Added Subjects:</h3>
            <ul className='list-disc list-inside'>
              {subjects.map((subject, index) => (
                <li key={index} className='flex justify-between items-center'>
                  {subject.name} {subject.topic && `(Topic: ${subject.topic})`}
                  <button
                    onClick={() =>
                      setSubjects((prev) =>
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

export default AddSubjects;
