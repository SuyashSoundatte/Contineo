import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function ReactTable() {
  const navigate = useNavigate();

  const columns = [
    {
      id: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Fname",
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: "Mname",
      selector: (row) => row.mname,
      sortable: true,
    },
    {
      name: "Lname",
      selector: (row) => row.lname,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Action", // New column for the button
      cell: (row) => (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => navigate(`/MainPage/TeacherMasterForm/${row.id}`)} // Pass user ID as part of URL
        >
          Action
        </button>
      ),
      ignoreRowClick: true,
    },
  ];

  const data = [
    { id: 1, fname: "John", mname: "Doe", lname: "Smith", role: "Admin" },
    { id: 2, fname: "Jane", mname: "Alice", lname: "Doe", role: "User" },
    // Add more data...
  ];

  const [records, setRecords] = useState(data);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newData = data.filter((row) =>
      row.fname.toLowerCase().includes(searchTerm) ||
      row.mname.toLowerCase().includes(searchTerm) ||
      row.lname.toLowerCase().includes(searchTerm) ||
      row.role.toLowerCase().includes(searchTerm)
    );
    setRecords(newData);
  };

  return (
    <div className="container mt-5">
      <div className="text-end mb-4">
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="text"
          onChange={handleFilter}
          placeholder="Search by first name, middle name, last name, or role"
        />
      </div>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
      />
    </div>
  );
}

export default ReactTable;
