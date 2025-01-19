import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, ReactTable,ButtonComponent } from './component.js';
import { useNavigate } from 'react-router-dom';

const StudentMasterForm = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/v1/getAllStudents', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecords(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const studentColumns = [
    {
      name: 'Roll',
      selector: (row) => row.roll_no,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.fname + ' ' + row.lname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone no',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Std',
      selector: (row) => row.std,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <ButtonComponent className="" onClick={() => navigate(`/MainPage/StudentForm/${row.user_id}`)}>
          View Student
        </ButtonComponent>
      ),
    },
  ];
  
  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      <div>
        <ButtonComponent 
          onClick={() => navigate('/MainPage/StudentCreate')}
        >Add New Student</ButtonComponent>
      </div>
      <ReactTable records={records} loading={loading} error={error} customColumns={studentColumns} />
    </div>
  );
};

export default StudentMasterForm;
