import React from "react";
import { useState } from "react";
import ReactTable from "../components/ReactTable";

const SubjectForm = () => {

    const[ topic, setTopic] = useState('');
    const[ subtopic, setSubTopic] = useState('');
    const[ time, setTime] = useState('');
    const[ topicTable, setTopicTable] = useState([
      { topic: '', subtopic:''}
      
    ]);


    const handleAddTopic = () => {
        if( topic && subtopic && time){
            setTopicTable( [ ...topicTable, {topic, subtopic}]);
            setTopic('');
            setSubTopic('');
            setTime('');
        }
        else{
            alert('Please fill all the fields');
        }
    };

    const handleEditTopic = (index) => {
        const selectTopic = topicTable[index];
        setTopic(selectTopic.topic);
        setSubTopic(selectTopic.subtopic);
        setTime('');
        setTopicTable(topic.filter((_,i) => i !== e))
    };


    return (
        <div className="p-8 max-w-3xl mx-auto font-sans">
            <h2 className="test-2xl font-bold mb-6">SubjectForm</h2>

            <div className="mb-6 p-6 border border-gray-300 rounded-lg shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-left">Add topic:</h3>
                <input type="text"
                        placeholder="Enter Student ID:"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                </div>


                <div>
                <h3 className="text-lg font-bold mb-4 text-left">Add Sub Topic:</h3> 
                <input type="text"
                        placeholder="Enter Student ID"
                        value={subtopic}
                        onChange={(e) => setSubTopic(e.target.value)}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                </div>

                <div>
                <h3 className="text-lg font-bold mb-4 text-left">Time to complete sub-topic:</h3> 

                <input type="text"
                        placeholder="Enter student ID"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                </div>
                
                <button 
                onClick={handleAddTopic}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"

                >Add Topic</button>

            </div>


            <div>
  <h3 className="text-lg font-bold mb-4">Topic List:</h3> 

  {/* <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="border border-gray-300 p-2 bg-gray-100">Topic</th>
        <th className="border border-gray-300 p-2 bg-gray-100">Sub Topic</th>
        <th className="border border-gray-300 p-2 bg-gray-100">Update</th>
      </tr>
    </thead>
    <tbody>
      {topicTable.map((row, index) => (
        <tr key={index} className="hover:bg-gray-50">
          <td className="border border-gray-300 p-2">{row.topic}</td>
          <td className="border border-gray-300 p-2">{row.subtopic}</td>
          <td className="border border-gray-300 p-2">
            <button
              onClick={() => handleEditTopic(index)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table> */}

  <ReactTable records={topicTable} loading={false} error={null} />
</div>



        </div>
    );
};

export default SubjectForm;
