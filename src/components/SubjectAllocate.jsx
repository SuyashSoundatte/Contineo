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
    <div className='w-full'>
      {/* Filter Section */}
      <div className="filters mb-4">
        <select onChange={handleSubjectChange} value={selectedSubject} className="mr-4">
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
          className="mr-4"
        />
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

export default SubjectAllocate;
