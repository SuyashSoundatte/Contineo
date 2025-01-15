import React, { useState, useEffect } from 'react';
import ReactTable from '../components/ReactTable';
import axios from 'axios';

const TeacherForm = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setRecords(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full'>
      <ReactTable records={records} loading={loading} error={error} />
    </div>
  );
};

export default TeacherForm;
