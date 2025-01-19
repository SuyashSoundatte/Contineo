  import React, { useState, useMemo } from 'react';
  import ReactTable from './ReactTable';
  import { ButtonComponent } from './component';

  const AttendanceForm = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [showAttendance, setShowAttendance] = useState(false);
    const [students, setStudents] = useState([]);

    const classes = [
      { id: 1, name: '11' },
      { id: 2, name: '9' },
      { id: 3, name: 'Class 8' },
    ];

    const divisions = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ];

    const studentsData = {
      'Class 10': {
        A: [
          { id: 1, user_id: '001', fname: 'John', lname: 'Doe', role: 'Student', present: true },
          { id: 2, user_id: '002', fname: 'Jane', lname: 'Smith', role: 'Student', present: true },
        ],
        B: [
          { id: 3, user_id: '003', fname: 'Alice', lname: 'Johnson', role: 'Student', present: true },
          { id: 4, user_id: '004', fname: 'Bob', lname: 'Brown', role: 'Student', present: true },
        ],
      },
      'Class 9': {
        A: [
          { id: 5, user_id: '005', fname: 'Charlie', lname: 'Davis', role: 'Student', present: true },
          { id: 6, user_id: '006', fname: 'Diana', lname: 'Evans', role: 'Student', present: true },
        ],
        B: [
          { id: 7, user_id: '007', fname: 'Edward', lname: 'Fisher', role: 'Student', present: true },
          { id: 8, user_id: '008', fname: 'Fiona', lname: 'Grant', role: 'Student', present: true },
        ],
      },
      'Class 8': {
        A: [
          { id: 9, user_id: '009', fname: 'George', lname: 'Harris', role: 'Student', present: true },
          { id: 10, user_id: '010', fname: 'Hannah', lname: 'Irving', role: 'Student', present: true },
        ],
        B: [
          { id: 11, user_id: '011', fname: 'Ian', lname: 'Jackson', role: 'Student', present: true },
          { id: 12, user_id: '012', fname: 'Julia', lname: 'Kennedy', role: 'Student', present: true },
        ],
      },
    };

    const handleClassChange = (event) => {
      setSelectedClass(event.target.value);
      setSelectedDivision('');
      setShowAttendance(false);
    };

    const handleDivisionChange = (event) => {
      setSelectedDivision(event.target.value);
      setShowAttendance(false);
    };

    const handleProceed = () => {
      if (selectedClass && selectedDivision) {
        setStudents(studentsData[selectedClass][selectedDivision]);
        setShowAttendance(true);
      } else {
        alert('Please select both Class and Division to proceed.');
      }
    };

    const handleAttendanceChange = (id, status) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, present: status } : student
        )
      );
    };

    const markAllPresent = () => {
      setStudents((prevStudents) =>
        prevStudents.map((student) => ({ ...student, present: true }))
      );
    };

    const markAllAbsent = () => {
      setStudents((prevStudents) =>
        prevStudents.map((student) => ({ ...student, present: false }))
      );
    };

    const submitAttendance = () => {
      const payload = {
        class: selectedClass,
        division: selectedDivision,
        date: new Date().toISOString().split('T')[0],
        students,
      };
      console.log('Submitted Attendance Data:', payload);
      alert('Attendance submitted successfully. Check the console for details.');
    };

    const customColumns = useMemo(
      () => [
        {
          name: 'Name',
          selector: (row) => `${row.fname} ${row.lname}`,  // Fixed template literal syntax
          sortable: true,
        },
        {
          name: 'Roll No',
          selector: (row) => row.user_id,
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
                        <option key={cls.id} value={cls.name}>
                          {cls.name}
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
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- Select Division --</option>
                      {divisions.map((div) => (
                        <option key={div.id} value={div.name}>
                          {div.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <ButtonComponent onClick={handleProceed} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
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
                    <ButtonComponent onClick={markAllPresent} className="bg-green-100 text-green-700 hover:bg-green-200 py-1 px-3 rounded-md text-sm font-medium transition-colors">
                      Mark All Present
                    </ButtonComponent>
                    <ButtonComponent onClick={markAllAbsent} className="bg-red-100 text-red-700 hover:bg-red-200 py-1 px-3 rounded-md text-sm font-medium transition-colors">
                      Mark All Absent
                    </ButtonComponent>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <ReactTable records={students} loading={false} error={null} customColumns={customColumns} />
                </div>
                <ButtonComponent onClick={submitAttendance} className=" bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  Submit Attendance
                </ButtonComponent>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default AttendanceForm;