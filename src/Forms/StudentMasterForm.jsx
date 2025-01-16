import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ButtonComponent, Input, ReactTable } from '../components/component.js';
import { useNavigate } from 'react-router-dom';

const StudentMasterForm = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
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
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const teacherColumns = [
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
      name: 'Standard',
      selector: (row) => row.standard,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <ButtonComponent onClick={() => navigate(`/MainPage/StudentForm/${row.user_id}`)}>Add Files</ButtonComponent>
      ),
    },
  ];

  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      <ReactTable records={records} loading={loading} error={error} customColumns={teacherColumns}/>
    </div>
  );
};

export default StudentMasterForm;
