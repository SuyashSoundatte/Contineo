import DataTable from "react-data-table-component";
import { useState } from "react";

function ReactTable({ buttonAction }) {
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
          onClick={() => buttonAction(row)} // Call the passed buttonAction function
        >
          Action
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  const data = [
    {
      id: 1,
      fname: "John",
      mname: "Doe",
      lname: "Smith",
      role: "Admin",
    },
    {
      id: 2,
      fname: "Jane",
      mname: "Alice",
      lname: "Doe",
      role: "User",
    },
    {
      id: 3,
      fname: "Michael",
      mname: "David",
      lname: "Brown",
      role: "Moderator",
    },
  ];

  const [records, setRecords] = useState(data);

  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.fname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  return (
    <div className="container mt-5">
      <div className="text-end mb-4">
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="text"
          onChange={handleFilter}
          placeholder="Search by first name"
        />
      </div>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
      />
    </div>
  );
}

export default ReactTable;
