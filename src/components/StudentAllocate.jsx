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
          "http://localhost:3000/api/v1/getUsers",
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

    // Update the selected state of the specific row
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

  // Custom columns for ReactTable
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
      selector: (row) => row.subject,
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
          checked={row.selected} // assuming "selected" is part of your row data
          onChange={(e) => handleCheckboxChange(e, row)} // handle the change event
          className='ml-2'
        />
      ),
    },
  ];

  return (
    <div className='w-full max-w-8xl mx-auto p-4 space-y-6'>
      {/* Filter Section */}
      <div className='flex flex-col gap-4 mb-6'>
        <div className='flex gap-4'>
          <Select
            label='Standard'
            options={["standard","Std 11", "Std 12"]}
          />
          <Select 
            label='Division'
            options={["Division", "Division A", "Division B"]}
          />
          <div className="flex justify-center items-end">
            <ButtonComponent>Add</ButtonComponent>
          </div>
        </div>
      </div>

      {/* Student Table with Filtered Data */}
      <div className='bg-white shadow overflow-hidden rounded-md'>
        <ReactTable
          customColumns={teacherColumns} // Pass custom columns here
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
