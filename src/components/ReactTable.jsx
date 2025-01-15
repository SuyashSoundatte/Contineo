import React, { useEffect, useMemo } from 'react';
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
        id: 'User ID',
        selector: (row) => row.user_id,
        sortable: true,
      },
      {
        name: 'First Name',
        selector: (row) => row.fname,
        sortable: true,
      },
      // {
      //   name: 'Middle Name',
      //   selector: (row) => row.mname,
      //   sortable: true,
      // },
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
            onClick={() => navigate(`/MainPage/TeacherMasterForm/${row.user_id}`)}
          >
            Action
          </button>
        ),
        ignoreRowClick: true,
      },
    ],
    [navigate]
  );

 return (
    <div className="container mx-auto mt-5">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">No records to display.</p>
      ) : (
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={records}
            fixedHeader
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noDataComponent={<p className="text-center text-gray-500">No records to display.</p>}
          />
        </div>
      )}
    </div>
  );
}

export default ReactTable;
