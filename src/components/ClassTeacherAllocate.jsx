import React, { useState, useEffect } from 'react';
import ReactTable from '../components/ReactTable';
import axios from 'axios';

const ClassTeacherAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState('');
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [selectedMentors, setSelectedMentors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/v1/getAllClassTeacher', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Data:", response.data); // Log full response
        setRecords(response.data.data); // Set records after fetching data
      } catch (err) {
        console.error("Error fetching data:", err); // Log error for better debugging
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Records updated:", records); // Log records after they are set
  }, [records]);

  const handleStdChange = (event) => {
    setSelectedStd(event.target.value);
  };

  const handleMentorIdChange = (event) => {
    setSelectedMentorId(event.target.value);
  };

  const handleMentorSelect = (mentorId) => {
    setSelectedMentors((prevSelectedMentors) => {
      if (prevSelectedMentors.includes(mentorId)) {
        return prevSelectedMentors.filter(id => id !== mentorId);
      } else {
        return [...prevSelectedMentors, mentorId];
      }
    });
  };

  const filteredRecords = records.filter(record => {
    return (
      (selectedStd ? record.std === selectedStd : true) &&
      (selectedMentorId ? record.mentorId.includes(selectedMentorId) : true)
    );
  });

  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      {/* Filter Section */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <select 
            onChange={handleStdChange} 
            value={selectedStd} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Standard</option>
            <option value="std1">Standard 1</option>
            <option value="std2">Standard 2</option>
            <option value="std3">Standard 3</option>
            {/* Add more options as per your data */}
          </select>

          <input
            type="text"
            placeholder="Enter Mentor ID"
            value={selectedMentorId}
            onChange={handleMentorIdChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Mentor Table with Filtered Data */}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ReactTable
          records={filteredRecords}
          loading={loading}
          error={error}
          onMentorSelect={handleMentorSelect}
          selectedMentors={selectedMentors}
        />
      </div>
    </div>
  );
};

export default ClassTeacherAllocate;
