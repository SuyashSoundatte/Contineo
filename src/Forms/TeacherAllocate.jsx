import React, { useState, useEffect } from 'react';
import ReactTable from '../components/ReactTable';
import axios from 'axios';

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
    <div className='w-full'>
      {/* Filter Section */}
      <div className="filters mb-4">
        <select onChange={handleStdChange} value={selectedStd} className="mr-4">
          <option value="">Select Standard</option>
          <option value="std1">Standard 1</option>
          <option value="std2">Standard 2</option>
          <option value="std3">Standard 3</option>
          {/* Add more options as per your data */}
        </select>
        <select onChange={handleSubChange} value={selectedSub} className="mr-4">
          <option value="">Select Subject</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          {/* Add more options as per your data */}
        </select>
      </div>

      {/* Teacher Table with Filtered Data */}
      <ReactTable
        records={filteredRecords}
        loading={loading}
        error={error}
        onTeacherSelect={handleTeacherSelect}
        selectedTeachers={selectedTeachers}
      />
    </div>
  );
};

export default TeacherAllocate;
