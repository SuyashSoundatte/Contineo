  import React, { useState } from "react";
  import ReactTable from "../components/ReactTable";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useForm } from "react-hook-form";
  import ButtonComponent from "../components/ButtonComponent";
  import Input from "../components/Input";

  const SubjectForm = () => {
    const [topic, setTopic] = useState("");
    const [subtopic, setSubTopic] = useState("");
    const [time, setTime] = useState("");
    const [topicTable, setTopicTable] = useState([]);
    // const [showToast, setShowToast] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const handleAddTopic = () => {
      try {
        // Check if all fields are filled
        if (!data.topic || !data.subtopic || !data.time) {
          toast.error("Please fill all the fields", {
            position: "top-right",
            autoClose: 5000,
          });
          // console.log("Error: Fields are missing");
          return; // Exit early to prevent adding incomplete data
        }

        // Add topic to the table if all fields are filled
        setTopicTable([...topicTable, { topic: data.topic, subtopic: data.subtopic, time: data.time }]);
        setTopic("");
        setSubTopic("");
        setTime("");

        reset();
        // Show success toast after adding a topic
        toast.success("Topic added successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        console.log("Topic added successfully");

      } catch (error) {
        // Log any unexpected errors
        // console.error("Error adding topic:", error);
        toast.error("An error occurred while adding the topic", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };

    const handleEditTopic = (index) => {
      const selectedTopic = topicTable[index];
      reset(selectedTopic);
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
        <form onSubmit={handleSubmit(handleAddTopic)}>
          <div>
            <Input
              label = 'Topic'
              type="text"
              placeholder="Enter Topic"
              {...register("topic", { required: "Topic is required" })}
              className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.topic && <p className="text-red-500 text-sm">{errors.topic.message}</p>}
          </div>

          <div>
            <Input
              label = 'Subtopic'
              type="text"
              placeholder="Enter Subtopic"
              {...register("subtopic", { required: "Subtopic is required" })}
              className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.subtopic && <p className="text-red-500 text-sm">{errors.subtopic.message}</p>}
          </div>

          {/* <div>
            <h3 className="text-lg font-bold mb-4 text-left">Time to Complete Subtopic:</h3>
            <input
              type="text"
              placeholder="Enter Time"
              {...register("time", { required: "Time is required" })}
              className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
          </div> */}

          <div>
            <ButtonComponent
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Add Topic
            </ButtonComponent>
          </div>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Topic List:</h3>
        <ReactTable records={topicTable} loading={false} error={null} columns={columns} />
      </div>

      <ToastContainer />
    </div>
    );
  };

  export default SubjectForm;
