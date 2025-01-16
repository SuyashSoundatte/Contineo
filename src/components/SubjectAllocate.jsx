import React, { useState, useEffect } from 'react';
import ReactTable from '../components/ReactTable';
import axios from 'axios';

const SubjectAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/v1/getUsers', {
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

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleTeacherIdChange = (event) => {
    setSelectedTeacherId(event.target.value);
  };

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeachers((prevSelectedTeachers) => {
      if (prevSelectedTeachers.includes(teacherId)) {
        return prevSelectedTeachers.filter(id => id !== teacherId);
      } else {
        return [...prevSelectedTeachers, teacherId];
      }
    });
  };

  const filteredRecords = records.filter(record => {
    return (
      (selectedSubject ? record.subject === selectedSubject : true) &&
      (selectedTeacherId ? record.teacherId.includes(selectedTeacherId) : true)
    );
  });

  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      {/* Filter Section */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <select 
            onChange={handleSubjectChange} 
            value={selectedSubject} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            {/* Add more options as per your data */}
          </select>

          <input
            type="text"
            placeholder="Enter Teacher ID"
            value={selectedTeacherId}
            onChange={handleTeacherIdChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Teacher Table with Filtered Data */}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ReactTable
          records={filteredRecords}
          loading={loading}
          error={error}
          onTeacherSelect={handleTeacherSelect}
          selectedTeachers={selectedTeachers}
        />
      </div>
    </div>
  );
};

export default SubjectAllocate;
