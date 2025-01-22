import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, ReactTable,ButtonComponent, Select, } from './component.js';
import { useNavigate } from 'react-router-dom';

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
        const response = await axios.get('http://localhost:3000/api/v1/getAllTeacher', {
          headers: { Authorization: `Bearer ${token}` },
        });
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
  const subject_allocate_columns = [
    {
      name: 'User ID',
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lname,
      sortable: true,
    },
   
    {
      name: 'Subject',
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: 'email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone no',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Class ',
      selector: (row) => row.class,
      sortable: true,
    },
    {
      name: 'Div ',
      selector: (row) => row.div,
      sortable: true,
    },
    {
      name: 'Batch',
      selector: (row) => row.batch,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <ButtonComponent className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          View
        </ButtonComponent>
      ),
    },
  ]

  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <Select 
            label = 'Select Subject'
            options={["Select Subject", "Math", "Science", "English"]}
            onChange={handleSubjectChange}
            value={selectedSubject}
          />

          <input
            type="text"
            placeholder="Enter Teacher ID"
            value={selectedTeacherId}
            onChange={handleTeacherIdChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Input 
            label = 'Teacher ID'
            type="text"
            placeholder="Enter Teacher ID"
            value={selectedTeacherId}
            onChange={handleTeacherIdChange}
          />
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ReactTable
        customColumns={subject_allocate_columns}
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
