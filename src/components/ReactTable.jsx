import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useState } from 'react';

function ReactTable({ records, loading, error }) {
  const navigate = useNavigate();
  const [filteredRecords, setFilteredRecords] = useState(records);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        id: 'Id',
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: 'First Name',
        selector: (row) => row.fname,
        sortable: true,
      },
      {
        name: 'Middle Name',
        selector: (row) => row.mname,
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: (row) => row.lname,
        sortable: true,
      },
      {
        name: 'Role',
        selector: (row) => row.role,
        sortable: true,
      },
      {
        name: 'Action',
        cell: (row) => (
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            onClick={() => navigate(`/MainPage/TeacherMasterForm/${row.id}`)}
          >
            Action
          </button>
        ),
        ignoreRowClick: true,
      },
    ],
    [navigate]
  );

  // Filter functionality
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = records.filter((row) =>
      Object.values(row).some(
        (value) => value && value.toString().toLowerCase().includes(searchTerm)
      )
    );
    setFilteredRecords(filteredData);
  };

  return (
    <div className='container mx-auto mt-5'>
      <div className='text-end mb-4'>
        <input
          className='w-full border border-gray-300 rounded-md p-2'
          type='text'
          onChange={handleFilter}
          placeholder='Search by any field'
        />
      </div>
      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-500'>Error: {error}</p>
      ) : filteredRecords.length === 0 ? (
        <p className='text-center text-gray-500'>No matching records found.</p>
      ) : (
        <div className='overflow-x-auto'>
          <DataTable
            columns={columns}
            data={filteredRecords}
            fixedHeader
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noDataComponent={<p className='text-center text-gray-500'>No records to display.</p>}
          />
        </div>
      )}
    </div>
  );
}

export default ReactTable;
