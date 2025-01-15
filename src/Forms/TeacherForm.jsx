import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Input , ReactTable} from '../components/component.js';

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

  useEffect(() => {// Log records after they are set
  }, [records]);

  return (
    <div className='w-full'>
      <div>
        <Input 
          label='User ID'
          type='text'
          name='user_id'
          placeholder='Enter User ID'
        />
      </div>
      <ReactTable records={records} loading={loading} error={error} />
      {/* Check if records is populated */}
    </div>
  );
  
};

export default TeacherForm;
