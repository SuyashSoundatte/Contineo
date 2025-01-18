import React, { useState } from "react";
import ReactTable from "../components/ReactTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import ButtonComponent from "../components/ButtonComponent";
import Input from "../components/Input";
import Select from "../components/Select";

const SubjectForm = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentSubtopic, setCurrentSubtopic] = useState("");
  const [currentTopicSubtopics, setCurrentTopicSubtopics] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setTopics([]); // Reset topics when changing the subject
    setCurrentTopic("");
    setCurrentSubtopic("");
    setCurrentTopicSubtopics([]);
  };

  const handleAddSubtopic = () => {
    if (!currentSubtopic) {
      toast.error("Please enter a subtopic", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    // Add the subtopic to the current topic's subtopics
    setCurrentTopicSubtopics([...currentTopicSubtopics, currentSubtopic]);
    setCurrentSubtopic(""); // Clear the subtopic input field

    toast.success("Subtopic added successfully", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const handleAddTopic = () => {
    if (!currentTopic || currentTopicSubtopics.length === 0) {
      toast.error("Please complete the topic with all subtopics", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    const newTopic = {
      subject: selectedSubject,
      topic: currentTopic,
      subtopics: currentTopicSubtopics,
    };

    setTopics([...topics, newTopic]); // Add the new topic to the topics array
    setCurrentTopic(""); // Reset current topic input
    setCurrentTopicSubtopics([]); // Reset subtopics for the current topic
    setCurrentSubtopic(""); // Reset the subtopic input field

    toast.success("Topic added successfully", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const handleSubjectFormSubmit = () => {
    if (topics.length === 0) {
      toast.error("Please add at least one topic for the subject", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    // Handle form submission logic (e.g., save the topics data)
    toast.success("Subject data saved successfully", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const columns = [
    {
      name: "Topic",
      selector: (row) => row.topic,
      sortable: true,
    },
    {
      name: "Subtopics",
      selector: (row) => row.subtopics.join(", "),
      sortable: true,
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Subject Form</h2>

      <div className="mb-8">
        <Select
          label="Select Subject"
          options={["Select", "Physics", "Chemistry", "Maths"]}
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {selectedSubject && (
        <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">{`Add Topics for ${selectedSubject}`}</h3>

          <form onSubmit={handleSubmit(handleSubjectFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Topic Input */}
              <div>
                <Input
                  label="Topic"
                  type="text"
                  placeholder="Enter Topic"
                  value={currentTopic}
                  onChange={(e) => setCurrentTopic(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.topic && <p className="mt-1 text-red-500 text-sm">{errors.topic.message}</p>}
              </div>

              {/* Subtopic Input */}
              <div>
                <Input
                  label="Subtopic"
                  type="text"
                  placeholder="Enter Subtopic"
                  value={currentSubtopic}
                  onChange={(e) => setCurrentSubtopic(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.subtopic && <p className="mt-1 text-red-500 text-sm">{errors.subtopic.message}</p>}
              </div>
            </div>

            <div className="flex space-x-4">
              <ButtonComponent
                type="button"
                onClick={handleAddSubtopic}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Add Subtopic
              </ButtonComponent>

              <ButtonComponent
                type="button"
                onClick={handleAddTopic}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Add Topic
              </ButtonComponent>
            </div>

            {/* Show all added topics */}
            {topics.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Current Topics</h4>
                <div className="bg-white overflow-hidden shadow-md rounded-lg">
                  <ReactTable records={topics} columns={columns} />
                </div>
              </div>
            )}

            <ButtonComponent
              type="submit"
              className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Save Subject Data
            </ButtonComponent>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SubjectForm;
