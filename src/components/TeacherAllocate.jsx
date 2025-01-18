import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, ReactTable, Select, ButtonComponent, Modal } from "../components/component.js";
const TeacherAllocate = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
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
          "http://192.168.0.140:3000/api/v1/getAllTeacher",
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
  const handleSubjectChange = (event) => setSelectedSubject(event.target.value);

  const openModal = () => {
    setSelectedTeacher(selectedTeacher);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setModalOpen(false);
  };

  const confirmAllocation = async () => {
    if (!selectedStd || !selectedDiv) {
      alert(
        "Please Select both standard and division before allocating teacher"
      );
      closeModal();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://192.168.0.140:3000/api/v1/allocateTeacher",
        {
          teacherId: selectedTeacher.user_id,
          standard: selectedStd,
          division: selectedDiv,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Teacher allocated Successfully !");
    } catch (err) {
      console.log("Error Allocating Teacher", err);
      alert(err.response?.data?.message || "Error allocating teacher .")
    } finally {
      closeModal();
    }
  };

  const unallocatedTeachers = records.filter(
    (teacher) => !teacher.batchAssigned
  );
  const filteredUnallocatedTeachers = selectedSubject
    ? unallocatedTeachers.filter((teacher) => teacher.sub === selectedSubject)
    : unallocatedTeachers;

  const allocatedTeachers = records.filter((teacher) => teacher.batchAssigned);

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
      selector: (row) => row.standard || "Not Assigned",
      sortable: true,
    },
    {
      name: "Batch Assigned",
      selector: (row) => row.batchAssigned || "Not Assigned",
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

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
          Teacher Allocation
        </h1>

        <Modal 
          isOpen = {isModalOpen}
          onClose= {closeModal}
          onConfirm= {confirmAllocation}
          teacher= {selectedTeacher}
        />

        <div className='rounded-lg p-6 mb-8'>
          <form className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div>
              <Select 
                label = 'Standard'
                id = "standard"
                options={["Select Standard", "Standard 11", "Standard 12"]}
                onChange={handleStdChange}
                value={selectedStd}
              />
            </div>
            <div>
              <Select 
                label = 'division'
                id = "division"
                options={["Select Division", "Division A", "Division B"]}
                onChange={handleDivChange}
                value={selectedDiv}
              />
            </div>
            <div>
              <Select 
                label = 'Subject'
                id = "subject"
                options={["Select Subject", "Math", "Physics", "Chemistry"]}
                onChange={handleSubjectChange}
                value={selectedSubject}
              />
            </div>
          </form>

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
            <div className='flex items-center justify-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            </div>
          ) : (
            <>
              <h2 className='text-xl font-semibold mb-4'>
                Unallocated Teachers
              </h2>
              <div className='overflow-x-auto mb-8'>
                <ReactTable
                  customColumns={teacher_allocate_columns}
                  records={filteredUnallocatedTeachers}
                  onRowClick={(row) => console.log("Row clicked:", row)}
                />
              </div>

              <h2 className='text-xl font-semibold mb-4'>Allocated Teachers</h2>
              <div className='overflow-x-auto'>
                <ReactTable
                  customColumns={teacher_allocate_columns}
                  records={allocatedTeachers}
                  onRowClick={(row) => console.log("Row clicked:", row)}
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
