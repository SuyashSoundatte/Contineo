import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  ReactTable,
  Select,
  ButtonComponent,
  Modal,
} from "../components/component.js";

const TeacherAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const STANDARD_OPTIONS = ["Select Standard", "11", "12"];
  const DIVISION_OPTIONS = ["Select Division", "A", "B"];
  const SUBJECT_OPTIONS = ["Select Subject", "All", "Math", "Physics", "Chemistry"];

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
          "http://localhost:3000/api/v1/getAllTeacher",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const enrichedData = response.data.data.map((record) => ({
          ...record,
          selected: false,
        }));

        setRecords(enrichedData);
        console.log(enrichedData)
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
  const handleSubjectChange = (event) => setSelectedSubject(event.target.value);

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setModalOpen(false);
  };

  const confirmAllocation = async () => {
    if (!selectedTeacher || !selectedStd || !selectedDiv) {
      alert("Please select all required fields before allocation.");
      closeModal();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/api/v1/allocateTeacherSubject",
        {
          teacherId: selectedTeacher.teacher_id,
          std: selectedStd,
          div: selectedDiv,
          subject: selectedSubject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Teacher allocated successfully!");
    } catch (err) {
      console.error("Error Allocating Teacher:", err.response || err);
      alert(
        err.response?.data?.message ||
          "An error occurred while allocating the teacher."
      );
    } finally {
      closeModal();
    }
  };

  const unallocatedTeachers = records.filter(
    (teacher) => !teacher.batchAssigned
  );

  const allocatedTeachers = records.filter((teacher) => teacher.batchAssigned);

  const teacher_allocate_columns = [
    {
      name: "Teacher ID",
      selector: (row) => row.teacher_id,
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
    // {
    //   name: "Subjects",
    //   selector: (row) => row.subjects || "NA",
    //   sortable: true,
    // },
    {
      name: "Standard",
      selector: (row) => row.std || "NA",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ButtonComponent
          onClick={() => openModal(row)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Allocate to {selectedDiv}
        </ButtonComponent>
      ),
      ignoreRowClick: true,
    },
  ];

  const filteredRecords = records.filter((record) => {
    // Ensure that subjects is not null or undefined and only then check if it includes the selected subject
    const subjects = record.subjects || ''; // Default to an empty string if subjects is null or undefined
  
    return (
      selectedSubject === "All" ||
      selectedSubject === "" ||
      subjects.includes(selectedSubject)
    );
  });
  

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Teacher Allocation
        </h1>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmAllocation}
        >
          {selectedTeacher && (
            <div>
              <p>
                Are you sure you want to allocate{" "}
                <strong>
                  {selectedTeacher.fname} {selectedTeacher.lname}
                </strong>{" "}
                to Standard <strong>{selectedStd}</strong>, Division{" "}
                <strong>{selectedDiv}</strong>, Subject{" "}
                <strong>{selectedSubject}</strong>?
              </p>
            </div>
          )}
        </Modal>

        <div className="rounded-lg p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <Select
                label="Subject"
                id="subject"
                options={SUBJECT_OPTIONS}
                onChange={handleSubjectChange}
                value={selectedSubject}
              />
            </div>
            <div>
              <Select
                label="Standard"
                id="standard"
                options={STANDARD_OPTIONS}
                onChange={handleStdChange}
                value={selectedStd}
              />
            </div>
            <div>
              <Select
                label="Division"
                id="division"
                options={DIVISION_OPTIONS}
                onChange={handleDivChange}
                value={selectedDiv}
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

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p>Loading teachers...</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Unallocated Teachers
              </h2>
              <div className="overflow-x-auto mb-8">
                <ReactTable
                  customColumns={teacher_allocate_columns}
                  records={filteredRecords.filter((r) => !r.std)}
                />
              </div>

              <h2 className="text-xl font-semibold mb-4">Allocated Teachers</h2>
              <div className="overflow-x-auto">
                <ReactTable
                  customColumns={teacher_allocate_columns}
                  records={filteredRecords.filter((r) => r.std)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAllocate;
