import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTable from './ReactTable';
import { ButtonComponent } from './component';

const AttendanceForm = () => {
  const [classes, setClasses] = useState([
    { id: 1, std: '9' },
    { id: 2, std: '10' },
    { id: 3, std: '11' },
    { id: 4, std: '12' }
  ]);
  const [divisions, setDivisions] = useState([
    { id: 1, div: 'A' },
    { id: 2, div: 'B' },
    { id: 3, div: 'C' }
  ]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [showAttendance, setShowAttendance] = useState(false);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch students for selected class and division
  const fetchStudents = async () => {
    if (!selectedClass || !selectedDivision) {
      toast.error('Please select both class and division');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please log in.');
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/getStudentByStdDiv/${selectedClass}/${selectedDivision}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Transform students to match expected structure
      const fetchedStudents = response.data.data.map(student => ({
        id: student.stu_id,
        user_id: student.roll_no,
        fname: student.fname,
        lname: student.lname,
        gender: student.gender,
        role: 'Student',
        present: true // Default to present
      }));

      setStudents(fetchedStudents);
      setShowAttendance(true);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch students');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle class selection
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedDivision('');
    setShowAttendance(false);
  };

  // Handle division selection
  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setShowAttendance(false);
  };

  // Handle attendance change for individual student
  const handleAttendanceChange = (id, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, present: status } : student
      )
    );
  };

  // Mark all students present
  const markAllPresent = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, present: true }))
    );
  };

  // Mark all students absent
  const markAllAbsent = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, present: false }))
    );
  };

  // Submit attendance
  const submitAttendance = async () => {
    if (students.length === 0) {
      toast.error('No students to mark attendance for');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        class: selectedClass,
        division: selectedDivision,
        date: new Date().toISOString().split('T')[0],
        students: students.map(student => ({
          id: student.id,
          present: student.present
        }))
      };

      const response = await axios.post(
        'http://localhost:3000/api/v1/attendaceStudent', 
        payload,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success(response.data.message || 'Attendance submitted successfully');
      
      // Reset form after successful submission
      setSelectedClass('');
      setSelectedDivision('');
      setStudents([]);
      setShowAttendance(false);
    } catch (error) {
      console.error('Error submitting attendance:', error);
      toast.error(error.response?.data?.message || 'Failed to submit attendance');
    }
  };

  // Custom columns for ReactTable
  const customColumns = useMemo(
    () => [
      {
        name: 'Name',
        selector: (row) => `${row.fname} ${row.lname}`,
        sortable: true,
      },
      {
        name: 'Roll No',
        selector: (row) => row.user_id,
        sortable: true,
      },
      {
        name: 'Gender',
        selector: (row) => row.gender,
        sortable: true,
      },
      {
        name: 'Attendance',
        cell: (row) => (
          <div className="flex gap-2">
            <ButtonComponent
              onClick={() => handleAttendanceChange(row.id, true)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                row.present ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Present
            </ButtonComponent>
            <ButtonComponent
              onClick={() => handleAttendanceChange(row.id, false)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                !row.present ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              Absent
            </ButtonComponent>
          </div>
        ),
        ignoreRowClick: true,
        width: '250px',
      },
    ],
    [handleAttendanceChange]
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Attendance Sheet</h1>
          <div className="text-sm">
            <span>{new Date().toLocaleDateString()}</span> •{' '}
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
          </div>
        </div>
        <div className="p-6">
          {!showAttendance ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                  <select
                    id="class"
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Select Class --</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.std}>
                        {cls.std}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">Select Division</label>
                  <select
                    id="division"
                    value={selectedDivision}
                    onChange={handleDivisionChange}
                    disabled={!selectedClass}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  >
                    <option value="">-- Select Division --</option>
                    {divisions.map((div) => (
                      <option key={div.id} value={div.div}>
                        {div.div}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ButtonComponent 
                onClick={fetchStudents} 
                disabled={!selectedClass || !selectedDivision}
                className={`w-full py-2 px-4 rounded-md transition-colors ${
                  !selectedClass || !selectedDivision 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                Proceed to Take Attendance
              </ButtonComponent>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-2 sm:mb-0">
                  {selectedClass} - Division {selectedDivision}
                </h2>
                <div className="flex gap-2">
                  <ButtonComponent 
                    onClick={markAllPresent} 
                    className="bg-green-100 text-green-700 hover:bg-green-200 py-1 px-3 rounded-md text-sm font-medium transition-colors"
                  >
                    Mark All Present
                  </ButtonComponent>
                  <ButtonComponent 
                    onClick={markAllAbsent} 
                    className="bg-red-100 text-red-700 hover:bg-red-200 py-1 px-3 rounded-md text-sm font-medium transition-colors"
                  >
                    Mark All Absent
                  </ButtonComponent>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <ReactTable 
                  records={students} 
                  loading={isLoading} 
                  error={null} 
                  customColumns={customColumns} 
                />
              </div>
              <ButtonComponent 
                onClick={submitAttendance} 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Attendance
              </ButtonComponent>
            </div>
          )}
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AttendanceForm;