import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  ReactTable,
  Select,
  ButtonComponent,
  CheckboxComponent,
} from "./component.js";

const StudentAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [allocateLoading, setAllocateLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/getAllStudents",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const enrichedData = response.data.data.map((record) => ({
        ...record,
        selected: false,
        div: record.div || null,
      }));

      setRecords(enrichedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleStdChange = (event) => setSelectedStd(event.target.value);
  const handleDivChange = (event) => setSelectedDiv(event.target.value);

  const handleCheckboxChange = (e, row) => {
    const { checked } = e.target;

    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.user_id === row.user_id
          ? { ...record, selected: checked }
          : record
      )
    );

    if (checked) {
      setSelectedStudents((prev) => [...prev, String(row.user_id)]);
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== String(row.user_id)));
    }
  };

  const handleAllocate = async () => {
    if (!selectedDiv) {
      setError("Please select a division to allocate the students.");
      return;
    }
  
    if (selectedStudents.length === 0) {
      setError("Please select students to allocate.");
      return;
    }
  
    setAllocateLoading(true);
    setError(null);
    setSuccess(null);
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setAllocateLoading(false);
      return;
    }
  
    try {
      // Get all selected students' stu_id values
      const selectedRecords = records.filter(record => 
        selectedStudents.includes(String(record.user_id))
      );
      
      if (selectedRecords.length === 0) {
        throw new Error("Selected student records not found");
      }
  
      // Extract stu_id values and convert them to integers
      const studentIds = selectedRecords.map(record => parseInt(record.stu_id));
  
      // Make single API call with all student IDs
      await axios.put(
        "http://localhost:3000/api/v1/allocateStudentDiv",
        {
          studentIds: studentIds,
          div: selectedDiv
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      await fetchData();
      setSelectedStudents([]);
      setSuccess("Students successfully allocated to division.");
    } catch (err) {
      console.error("Error allocating students:", err);
      setError(
        err.response?.data?.message || 
        "Error allocating students. Please try again."
      );
    } finally {
      setAllocateLoading(false);
    }
  };
  
  // const handleRemove = async (row) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setError("Token not found. Please log in again.");
  //     return;
  //   }
  
  //   try {
  //     await axios.put(
  //       "http://localhost:3000/api/v1/allocateStudentDiv",
  //       {
  //         studentIds: [parseInt(row.stu_id)],
  //         div: null
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  
  //     await fetchData();
  //     setSuccess("Student successfully removed from division.");
  //   } catch (err) {
  //     console.error("Error removing student:", err);
  //     setError(
  //       err.response?.data?.message || 
  //       "Error removing student from division. Please try again."
  //     );
  //   }
  // };

  const filteredRecords = records.filter((record) => {
    return selectedStd === "All" || selectedStd === "" || record.std === selectedStd;
  });

  const Student_allocate_columns = [
    {
      name: "User ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Std id",
      selector: (row) => row.stu_id,
      sortable: true,
    },
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
      name: "Standard",
      selector: (row) => row.std,
      sortable: true,
    },
    {
      name: "Division",
      selector: (row) => row.div || "Not Assigned",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <CheckboxComponent
          label={`Add to ${selectedDiv}`}
          checked={row.selected}
          onChange={(e) => handleCheckboxChange(e, row)}
          disabled={!!row.div || allocateLoading || !selectedDiv}
        />
      ),
      ignoreRowClick: true,
    },
  ];

  const Student_unallocate_columns = [
    {
      name: "User ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
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
      name: "Standard",
      selector: (row) => row.std,
      sortable: true,
    },
    {
      name: "Division",
      selector: (row) => row.div || "Not Assigned",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ButtonComponent
          onClick={() => handleRemove(row)}
          disabled={allocateLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-gray-400"
        >
          Remove
        </ButtonComponent>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Student Allocation
        </h1>

        <div className="rounded-lg p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Select
                onChange={handleStdChange}
                value={selectedStd}
                label="Standard"
                options={["Select Standard", "All", "10", "11", "12"]}
              />
            </div>
            <div>
              <Select
                onChange={handleDivChange}
                label="Division"
                value={selectedDiv}
                options={["Select Division", "A", "Division B"]}
              />
            </div>
          </form>

          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Success</p>
              <p>{success}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Unallocated Students
                </h2>

                <div className="mt-4 mb-4">
                  <ButtonComponent 
                    onClick={handleAllocate}
                    disabled={selectedStudents.length === 0 || !selectedDiv || allocateLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-gray-400"
                  >
                    {allocateLoading ? "Allocating..." : `Allocate Selected Students (${selectedStudents.length})`}
                  </ButtonComponent>
                </div>
                <div className="overflow-x-auto">
                  <ReactTable
                    customColumns={Student_allocate_columns}
                    records={filteredRecords.filter((r) => !r.div)}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Allocated Students
                </h2>
                <div className="overflow-x-auto">
                  <ReactTable
                    customColumns={Student_unallocate_columns}
                    records={filteredRecords.filter((r) => r.div)}
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

export default StudentAllocate;