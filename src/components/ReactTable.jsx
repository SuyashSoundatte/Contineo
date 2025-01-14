import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function ReactTable() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  const columns = [
    {
      id: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: "Middle Name",
      selector: (row) => row.mname,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => navigate(`/MainPage/TeacherMasterForm/${row.id}`)}
        >
          Action
        </button>
      ),
      ignoreRowClick: true,
    },
  ];

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setRecords(data); // Set data to state
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // Filter functionality
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = records.filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm)
      )
    );
    setRecords(filteredData);
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="text-end mb-4">
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="text"
          onChange={handleFilter}
          placeholder="Search by any field"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={records} fixedHeader pagination />
        </div>
      )}
    </div>
  );
}

export default ReactTable;
