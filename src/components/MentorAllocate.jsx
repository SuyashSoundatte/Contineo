import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, ReactTable, Select, ButtonComponent} from './component.js';

const MentorAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");

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
          "http://localhost:3000/api/v1/getAllMentors",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const enrichedData = response.data.data.map((record) => ({
          ...record,
          selected: false,
        }));

        setRecords(enrichedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStdChange = (event) => setSelectedStd(event.target.value);
  const handleDivChange = (event) => setSelectedDiv(event.target.value);

  const handleAllocateMentor = (row) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.user_id === row.user_id
          ? { ...record, batchAssigned: `${selectedStd} - ${selectedDiv}` }
          : record
      )
    );
  };

  const filteredRecords = records.filter((record) => {
    return (
      (selectedStd ? record.standard === selectedStd : true) &&
      (selectedDiv ? record.division === selectedDiv : true)
    );
  });

  const teacher_allocate_columns = [
    {
      name: "Teacher ID",
      selector: (row) => row.user_id,
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
      name: "Subject",
      selector: (row) => row.sub,
      sortable: true,
    },
    {
      name: "Standard",
      selector: (row) => row.standard,
      sortable: true,
    },
    {
      name: "Batch Assigned",
      selector: (row) => row.batchAssigned,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ButtonComponent
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={() => handleAllocateMentor(row)}
        >
          Allocate
        </ButtonComponent>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentor Allocation</h1>

        <div className="rounded-lg p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              {/* <label htmlFor="standard" className="block text-sm font-medium text-gray-700 mb-1">
                Standard
              </label>
              <select
                id="standard"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedStd}
                onChange={handleStdChange}
              >
                <option value="">Select Standard</option>
                <option value="Standard 11">Standard 11</option>
                <option value="Standard 12">Standard 12</option>
              </select> */}
              <Select 
                onChange={handleStdChange}
                label='Standard'
                value={selectedStd}
                options={["Select Standard", "Standard 11", "Standard 12"]}
              />
            </div>
            <div>
              {/* <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
                Division
              </label>
              <select
                id="division"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedDiv}
                onChange={handleDivChange}
              >
                <option value="">Select Division</option>
                <option value="Division A">Division A</option>
                <option value="Division B">Division B</option>
              </select> */}

              <Select 
                onChange={handleDivChange}
                label='Division'
                value={selectedDiv}
                options={["Select Division", "Division A", "Division B"]}
              />
            </div>
          </form>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unallocated Mentor</h2>
                <div className="overflow-x-auto">
                  <ReactTable
                    customColumns={teacher_allocate_columns}
                    records={filteredRecords.filter((r) => !r.batchAssigned)}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Allocated Mentor</h2>
                <div className="overflow-x-auto">
                  <ReactTable
                    customColumns={teacher_allocate_columns}
                    records={filteredRecords.filter((r) => r.batchAssigned)}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorAllocate;
