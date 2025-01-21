import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Input, ButtonComponent } from './component.js';

function Table({ records, loading, error, customColumns }) {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState('');

  const columns = useMemo(
    () =>
      customColumns ||
      [
        {
          name: 'Subject ID',
          selector: (row) => row.sub_id,
          sortable: true,
        },
        {
          name: 'Subject Name',
          selector: (row) => row.subject,
          sortable: true,
        },
        {
          name: 'Subtopics',
          selector: (row) => row.subtopics,
          sortable: true,
        },
        {
          name: 'Title',
          selector: (row) => row.title,
          sortable: true,
        },
        {
          name: 'Action',
          cell: (row) => (
            <ButtonComponent
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              onClick={() => navigate(`/MainPage/SubjectForm/${row.sub_id}`)}
            >
              View
            </ButtonComponent>
          ),
          ignoreRowClick: true,
          button: true,
        },
      ],
    [customColumns, navigate]
  );

  const filteredRecords = useMemo(() => {
    return records.filter(
      (item) =>
        item.subject?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.subtopics?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.title?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [records, filterText]);

  const subHeaderComponent = useMemo(() => {
    return (
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-gray-400 mr-2">🔍</span>
        <Input
          type="text"
          placeholder="Filter by subject name, subtopics, or title"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }, [filterText]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-5 p-4 bg-white rounded-lg shadow">
      <DataTable
        columns={columns}
        data={filteredRecords}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        highlightOnHover
        pointerOnHover
        responsive
        subHeader
        subHeaderComponent={subHeaderComponent}
        persistTableHead
        noDataComponent={
          <div className="p-4 text-center text-gray-500">No records to display.</div>
        }
        customStyles={{
          headRow: {
            style: {
              backgroundColor: '#f3f4f6',
              borderBottomWidth: '1px',
              borderColor: '#e5e7eb',
            },
          },
          headCells: {
            style: {
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              paddingLeft: '16px',
              paddingRight: '16px',
            },
          },
          rows: {
            style: {
              fontSize: '0.875rem',
              color: '#1f2937',
              '&:not(:last-of-type)': {
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderColor: '#e5e7eb',
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Table;
