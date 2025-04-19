import React, { useState, useEffect } from "react";
import { Input, ReactTable, ButtonComponent } from "./component.js";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "../services/api.js";

const StudentMasterForm = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getStudents = async () => {
      try {
        const students = await fetchStudents();
        setRecords(students);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, []);

  const studentColumns = [
    {
      name: "Roll",
      selector: (row) => row.roll_no,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.fname} ${row.lname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone no",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Std",
      selector: (row) => row.std,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <ButtonComponent
          onClick={() => navigate(`/MainPage/ViewComponent/${row.user_id}`)}
        >
          View Student
        </ButtonComponent>
      ),
    },
  ];

  return (
    <div className='w-full max-w-8xl mx-auto p-4 space-y-6'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>Student List</h1>
        <ButtonComponent
          className='w-full sm:w-auto px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md'
          onClick={() => navigate("/MainPage/StudentCreate")}
        >
          Add New Student
        </ButtonComponent>
      </div>

      {loading ? (
        <p className='text-center text-gray-500'>Loading students...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : (
        <ReactTable
          records={records}
          loading={loading}
          error={error}
          customColumns={studentColumns}
        />
      )}
    </div>
  );
};

export default StudentMasterForm;
