import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Select, ReactTable, ButtonComponent } from "./component.js";

const SubjectForm = () => {
  // State for form inputs and data
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentSubtopic, setCurrentSubtopic] = useState("");
  const [currentTopicSubtopics, setCurrentTopicSubtopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Authentication token not found. Please log in again.");
          return;
        }

        const response = await axios.get('http://localhost:3000/api/v1/getBySubject', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Assuming the response contains an array of subjects
        setSubjects(response.data.data.map(subject => subject.subject));
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
          "An error occurred while fetching subjects";
        toast.error(errorMessage);
        console.error("Fetch subjects error:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Reset form inputs
  const resetInputs = () => {
    setCurrentTopic("");
    setCurrentSubtopic("");
    setCurrentTopicSubtopics([]);
  };

  // Handle subject change
  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
    setTopics([]); // Reset topics when changing the subject
    resetInputs();
  };

  // Add subtopic handler
  const handleAddSubtopic = () => {
    if (!currentSubtopic.trim()) {
      toast.error("Please enter a subtopic", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    // Prevent duplicate subtopics
    if (currentTopicSubtopics.includes(currentSubtopic.trim())) {
      toast.error("This subtopic already exists", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setCurrentTopicSubtopics([...currentTopicSubtopics, currentSubtopic.trim()]);
    setCurrentSubtopic(""); // Clear the subtopic input field

    toast.success("Subtopic added successfully", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  // Add topic handler
  const handleAddTopic = () => {
    if (!currentTopic.trim()) {
      toast.error("Please enter a topic", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (currentTopicSubtopics.length === 0) {
      toast.error("Please add at least one subtopic", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    // Prevent duplicate topics
    const isDuplicateTopic = topics.some(
      topic => topic.topic.toLowerCase() === currentTopic.trim().toLowerCase()
    );

    if (isDuplicateTopic) {
      toast.error("This topic already exists", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    const newTopic = {
      topic: currentTopic.trim(),
      subtopics: currentTopicSubtopics
    };

    setTopics([...topics, newTopic]);
    resetInputs();

    toast.success("Topic added successfully", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  // Remove topic handler
  const handleRemoveTopic = (topicToRemove) => {
    setTopics(topics.filter(topic => topic !== topicToRemove));
    toast.info("Topic removed", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Form submission handler
  const handleSubjectFormSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!selectedSubject || selectedSubject === "Select Subject") {
      toast.error("Please select a subject", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (topics.length === 0) {
      toast.error("Please add at least one topic", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    // Prepare data for submission
    const submitData = {
      subject: selectedSubject,
      topics: topics
    };

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/v1/addSubjectData', 
        submitData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Success handling
      toast.success(response.data.message || "Subject data saved successfully", {
        position: "top-right",
        autoClose: 5000,
      });

      // Reset form
      setSelectedSubject("");
      setTopics([]);
      resetInputs();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "An error occurred while saving subject data";
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });

      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Table columns for added topics
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
    {
      name: "Actions",
      cell: (row) => (
        <button 
          onClick={() => handleRemoveTopic(row)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      )
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Subject Form</h2>

      <div className="mb-8">
        <Select
          label="Select Subject"
          options={["Select Subject", ...subjects]}
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {selectedSubject && selectedSubject !== "Select Subject" && (
        <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">
            Add Topics for {selectedSubject}
          </h3>

          <form onSubmit={handleSubjectFormSubmit} className="space-y-6">
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
              </div>
            </div>

            {/* Current Topic's Subtopics */}
            {currentTopicSubtopics.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Current Topic Subtopics:</h4>
                <ul className="list-disc list-inside">
                  {currentTopicSubtopics.map((subtopic, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {subtopic}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTopicSubtopics(
                            currentTopicSubtopics.filter((_, i) => i !== index)
                          );
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
              disabled={isSubmitting}
              className={`mt-8 px-8 py-3 rounded-md text-white transition duration-150 ease-in-out ${
                isSubmitting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Subject Data'}
            </ButtonComponent>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SubjectForm;