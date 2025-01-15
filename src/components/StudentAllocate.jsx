import React, { useState, useEffect } from 'react';
import ReactTable from '../components/ReactTable';
import axios from 'axios';

const StudentAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState('');
  const [selectedPnr, setSelectedPnr] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

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

  const handlePnrChange = (event) => {
    setSelectedPnr(event.target.value);
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentId)) {
        return prevSelectedStudents.filter(id => id !== studentId);
      } else {
        return [...prevSelectedStudents, studentId];
      }
    });
  };

  const filteredRecords = records.filter(record => {
    return (
      (selectedStd ? record.std === selectedStd : true) &&
      (selectedPnr ? record.pnrNumber.includes(selectedPnr) : true)
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
        <input
          type="text"
          placeholder="Enter PNR Number"
          value={selectedPnr}
          onChange={handlePnrChange}
          className="mr-4"
        />
      </div>

      {/* Student Table with Filtered Data */}
      <ReactTable
        records={filteredRecords}
        loading={loading}
        error={error}
        onStudentSelect={handleStudentSelect}
        selectedStudents={selectedStudents}
      />
    </div>
  );
};

export default StudentAllocate;
