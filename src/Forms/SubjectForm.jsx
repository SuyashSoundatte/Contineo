import React, { useState } from "react";
import ReactTable from "../components/ReactTable";

const SubjectForm = () => {
  const [topic, setTopic] = useState("");
  const [subtopic, setSubTopic] = useState("");
  const [time, setTime] = useState("");
  const [topicTable, setTopicTable] = useState([]);

  const handleAddTopic = () => {
    if (topic && subtopic && time) {
      setTopicTable([...topicTable, { topic, subtopic, time }]);
      setTopic("");
      setSubTopic("");
      setTime("");
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleEditTopic = (index) => {
    const selectedTopic = topicTable[index];
    setTopic(selectedTopic.topic);
    setSubTopic(selectedTopic.subtopic);
    setTime(selectedTopic.time);

    // Remove the topic from the list to allow re-adding after editing
    setTopicTable(topicTable.filter((_, i) => i !== index));
  };

  const columns = [
    {
      name: "Topic",
      selector: (row) => row.topic,
      sortable: true,
    },
    {
      name: "Subtopic",
      selector: (row) => row.subtopic,
      sortable: true,
    },
    {
      name: "Time to Complete",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
          onClick={() => handleEditTopic(index)}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="p-8 max-w-8xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-6">Subject Form</h2>

      <div className="mb-6 p-6 border border-gray-300 rounded-lg shadow-sm">
        <div>
          <h3 className="text-lg font-bold mb-4 text-left">Add Topic:</h3>
          <input
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-left">Add Subtopic:</h3>
          <input
            type="text"
            placeholder="Enter Subtopic"
            value={subtopic}
            onChange={(e) => setSubTopic(e.target.value)}
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-left">Time to Complete Subtopic:</h3>
          <input
            type="text"
            placeholder="Enter Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleAddTopic}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Add Topic
        </button>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Topic List:</h3>
        <ReactTable records={topicTable} loading={false} error={null} columns={columns} />
      </div>
    </div>
  );
};

export default SubjectForm;
