import { useState, useEffect } from "react";
import {
  ReactTable,
  Select,
  ButtonComponent,
  Modal,
} from "../components/component.js";
import { getAllTeacher, getTeacherByAllocation, allocateTeacherSubject } from "../services/api.js";

const TeacherAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [allocatedTeachers, setAllocatedTeachers] = useState([]);

  const STANDARD_OPTIONS = ["Select Standard", "11", "12"];
  const DIVISION_OPTIONS = ["Select Division", "A", "B"];
  const SUBJECT_OPTIONS = ["Select Subject", "Math", "Physics", "Chemistry"];

  // Fetch all teachers initially
  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const response = await getAllTeacher();

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

    fetchAllTeachers();
  }, []);

  // Fetch allocated teachers when all filters are selected
  useEffect(() => {
    const fetchAllocatedTeachers = async () => {
      if (
        !selectedStd ||
        selectedStd === "Select Standard" ||
        !selectedDiv ||
        selectedDiv === "Select Division" ||
        !selectedSubject ||
        selectedSubject === "Select Subject"
      ) {
        setAllocatedTeachers([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getTeacherByAllocation();

        setAllocatedTeachers(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching allocated teachers:", err);
        setError("No teacher allocated for current selection");
        setAllocatedTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllocatedTeachers();
  }, [selectedStd, selectedDiv, selectedSubject]);

  const handleStdChange = (event) => {
    setSelectedStd(event.target.value);
  };

  const handleDivChange = (event) => {
    setSelectedDiv(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setModalOpen(false);
  };

  const confirmAllocation = async () => {
    if (!selectedTeacher || !selectedStd || !selectedDiv || !selectedSubject) {
      alert("Please select all required fields before allocation.");
      closeModal();
      return;
    }

    const formatedData = {
      teacherId: selectedTeacher.teacher_id,
      std: selectedStd,
      div: selectedDiv,
      subject: selectedSubject,
    }
    try {
      await allocateTeacherSubject(formatedData)
      alert("Teacher allocated successfully!");

      // Refresh the allocated teachers list
      const updatedRecords = records.map((record) =>
        record.teacher_id === selectedTeacher.teacher_id
          ? {
              ...record,
              std: selectedStd,
              div: selectedDiv,
              subject: selectedSubject,
            }
          : record
      );
      setRecords(updatedRecords);
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

  // ... (rest of the imports and code remain the same)

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
    {
      name: "Subjects",
      selector: (row) => {
        try {
          const subjects = JSON.parse(row.subjects || "[]");
          return Array.isArray(subjects) && subjects.length > 0
            ? subjects
                .map(
                  (sub) =>
                    sub.charAt(0).toUpperCase() + sub.slice(1).toLowerCase()
                )
                .join(", ")
            : "NA";
        } catch (error) {
          return "NA";
        }
      },
      sortable: true,
    },
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
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out'
        >
          Allocate
        </ButtonComponent>
      ),
      ignoreRowClick: true,
    },
  ];

  const teacher_already_allocate_columns = [
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
    {
      name: "Subjects",
      selector: (row) => row.subjects || "NA",
      sortable: true,
    },
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
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out'
        >
          Transfer
        </ButtonComponent>
      ),
      ignoreRowClick: true,
    },
  ];

  // Filter available teachers based on selected subject
  const availableTeachers = records.filter((record) => {
    const subjects = record.subjects || "";
    return (
      !record.std && // Not already allocated
      (selectedSubject === "Select Subject" ||
        subjects.includes(selectedSubject))
    );
  });

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
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

        <div className='rounded-lg p-6 mb-8'>
          <form className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div>
              <Select
                label='Subject'
                id='subject'
                options={SUBJECT_OPTIONS}
                onChange={handleSubjectChange}
                value={selectedSubject}
              />
            </div>
            <div>
              <Select
                label='Standard'
                id='standard'
                options={STANDARD_OPTIONS}
                onChange={handleStdChange}
                value={selectedStd}
              />
            </div>
            <div>
              <Select
                label='Division'
                id='division'
                options={DIVISION_OPTIONS}
                onChange={handleDivChange}
                value={selectedDiv}
              />
            </div>
          </form>

          {selectedStd !== "Select Standard" &&
          selectedDiv !== "Select Division" &&
          selectedSubject !== "Select Subject" ? (
            allocatedTeachers.length > 0 ? (
              <>
                <h2 className='text-xl font-semibold mb-4'>
                  Currently Allocated Teachers for Selected Filters
                </h2>
                <div className='overflow-x-auto'>
                  <ReactTable
                    customColumns={teacher_already_allocate_columns}
                    records={allocatedTeachers}
                  />
                </div>
              </>
            ) : (
              <p className='text-gray-600'>
                No teachers allocated for the selected filters.
              </p>
            )
          ) : (
            <p className='text-gray-600'>
              Please select all filters to view allocated teachers.
            </p>
          )}

          {error && (
            <div
              className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6'
              role='alert'
            >
              <p className='font-bold'>Error</p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className='flex flex-col items-center justify-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
              <p>Loading teachers...</p>
            </div>
          ) : (
            <>
              <h2 className='text-xl font-semibold mb-4'>Available Teachers</h2>
              <div className='overflow-x-auto mb-8'>
                <ReactTable
                  customColumns={teacher_allocate_columns}
                  records={availableTeachers}
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
