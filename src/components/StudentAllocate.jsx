import React, { useState, useEffect } from "react";
import {
  ReactTable,
  CheckboxComponent,
  ButtonComponent,
  Select,
} from "../components/component.js";
import axios from "axios";

const StudentAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedPnr, setSelectedPnr] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

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
          "http://localhost:3000/api/v1/getAllStudents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecords(response.data.data || []);
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

  const handlePnrChange = (event) => setSelectedPnr(event.target.value);

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleCheckboxChange = (event, row) => {
    const { checked } = event.target;

    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.user_id === row.user_id
          ? { ...record, selected: checked }
          : record
      )
    );
  };

  const filteredRecords = records.filter((record) => {
    return (
      (!selectedStd || record.std === selectedStd) &&
      (!selectedPnr || record.pnrNumber.includes(selectedPnr))
    );
  });

  const teacherColumns = [
    {
      name: "User ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject || "null",
      sortable: true,
    },
    {
      name: "Batch",
      selector: (row) => row.batch,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row) => row.class,
      sortable: true,
    },
    {
      name: "Div",
      selector: (row) => row.div,
      sortable: true,
    },
    {
      name: "PRN",
      selector: (row) => row.prn,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <CheckboxComponent
          label='Select'
          checked={row.selected}
          onChange={(e) => handleCheckboxChange(e, row)}
          className='ml-2'
        />
      ),
    },
  ];

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-8 space-y-8'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Student Allocation</h2>
      
      {/* Filter Section */}
      <div className='bg-white shadow-md rounded-lg p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Select
            label='Standard'
            options={["standard","Std 11", "Std 12"]}
            className='w-full'
          />
          <Select 
            label='Division'
            options={["Division", "Division A", "Division B"]}
            className='w-full'
          />
          <div className="flex items-end">
            <ButtonComponent className='w-full md:w-auto px-6 py-2.5'>Add</ButtonComponent>
          </div>
        </div>
      </div>

      {/* Student Table with Filtered Data */}
      <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <ReactTable
          customColumns={teacherColumns}
          records={filteredRecords}
          loading={loading}
          error={error}
          onStudentSelect={handleStudentSelect}
          selectedStudents={selectedStudents}
          btnValue={"Add To div"}
        />
      </div>
    </div>
  );
};

export default StudentAllocate;

