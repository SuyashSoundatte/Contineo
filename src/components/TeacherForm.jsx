import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonComponent, ReactTable } from "./component.js";

const TeacherForm = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getAllTeacher",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRecords(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const staffColumns = [
    {
      name: "Staff ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.lname,
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
      name: "Action",
      cell: (row) => (
        <ButtonComponent
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          onClick={() => navigate(`/MainPage/ViewComponent/${row.user_id}`)}
        >
          view staff
        </ButtonComponent>
      ),
    },
  ];

  return (
    <div className='w-full max-w-8xl mx-auto p-4 space-y-6'>
      <div>
        <ButtonComponent onClick={() => navigate("/MainPage/UserForm")}>
          Add New Staff
        </ButtonComponent>
      </div>
      <h1 className='text-2xl font-semibold text-gray-900 mb-8'>Staff List</h1>
      <ReactTable
        records={records}
        loading={loading}
        error={error}
        customColumns={staffColumns}
      />
    </div>
  );
};

export default TeacherForm;
