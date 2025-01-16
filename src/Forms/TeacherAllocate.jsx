import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, ReactTable } from '../components/component.js';

const TeacherAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
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

        console.log("Fetched Data:", response.data);
        setRecords(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Records updated:", records);
  }, [records]);

  const handleStdChange = (event) => {
    setSelectedStd(event.target.value);
  };

  const handleSubChange = (event) => {
    setSelectedSub(event.target.value);
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
      (selectedStd ? record.std === selectedStd : true) &&
      (selectedSub ? record.sub === selectedSub : true)
    );
  });

  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      <form className="space-y-4">
        {/* Filter Section */}
        <div className="space-y-2">
          <label htmlFor="std" className="block text-sm font-medium text-gray-700">
            Standard
          </label>
          <select
            id="std"
            onChange={handleStdChange}
            value={selectedStd}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Standard</option>
            <option value="std1">Standard 1</option>
            <option value="std2">Standard 2</option>
            <option value="std3">Standard 3</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="sub" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            id="sub"
            onChange={handleSubChange}
            value={selectedSub}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Subject</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="english">English</option>
          </select>
        </div>
      </form>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ) : (
        <ReactTable
          records={filteredRecords}
          loading={loading}
          error={error}
          onTeacherSelect={handleTeacherSelect}
          selectedTeachers={selectedTeachers}
        />
      )}
    </div>
  );
};

export default TeacherAllocate;
