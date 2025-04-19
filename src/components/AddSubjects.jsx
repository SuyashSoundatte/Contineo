import React, { useState } from "react";
import { ButtonComponent, Input } from "./component.js";

const AddSubjects = ({ onSubjectsUpdate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const handleSubjectNameChange = (e) => {
    setSubjectName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subjectName) {
      alert("Subject name is required!");
      return;
    }

    // Add the subject as an object with a 'name' property
    const updatedSubjects = [...subjects, { name: subjectName }];
    setSubjects(updatedSubjects);
    setSubjectName("");

    // Notify parent about the updated subjects
    onSubjectsUpdate(updatedSubjects);
  };

  return (
    <>
      <ButtonComponent onClick={handleClick} type="button">
        Add Subject
      </ButtonComponent>
      {isMenuOpen && (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <Input
              label="Subject Name"
              type="text"
              name="subjectName"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={handleSubjectNameChange}
            />
          </div>
          <ButtonComponent onClick={handleSubmit} type="submit">
            Add Subject
          </ButtonComponent>
          <ButtonComponent onClick={handleClose} type="button">
            Close
          </ButtonComponent>
          <div className="mt-4">
            <h3 className="font-bold">Added Subjects:</h3>
            <ul className="list-disc list-inside">
              {subjects.map((subject, index) => (
                <li key={index} className="flex justify-between items-center">
                  {subject.name}
                  <button
                    onClick={() => {
                      const updatedSubjects = subjects.filter((_, i) => i !== index);
                      setSubjects(updatedSubjects);
                      onSubjectsUpdate(updatedSubjects); // Notify parent of deletion
                    }}
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

export default AddSubjects;
