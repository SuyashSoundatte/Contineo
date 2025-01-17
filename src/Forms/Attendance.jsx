import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import ButtonComponent from "../components/ButtonComponent";
import Select from "../components/Select";
import Input from "../components/Input";

export default function Attendance() {
  const predefinedData = {
    date: "2025-01-17",
    day: "Friday",
    students: [
      { id: 1, name: "John Doe", rollNo: "001", present: true },
      { id: 2, name: "Jane Smith", rollNo: "002", present: false },
      { id: 3, name: "Alice Johnson", rollNo: "003", present: true },
      { id: 4, name: "Bob Brown", rollNo: "004", present: false },
    ],
  };

  const [currentDate] = useState(predefinedData.date);
  const [currentDay] = useState(predefinedData.day);
  const [students, setStudents] = useState(predefinedData.students);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

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
      date: currentDate,
      day: currentDay,
      students,
    };
    console.log("Submitted Attendance Data:", payload);
    alert("Attendance submitted successfully. Check the console for details.");
  };

  const handleStandardChange = (event) => {
    setSelectedStandard(event.target.value);
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      (selectedStandard ? student.standard === selectedStandard : true) &&
      (selectedDivision ? student.division === selectedDivision : true)
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Roll No",
        accessor: "rollNo",
      },
      {
        Header: "Attendance",
        accessor: "present",
        Cell: ({ row }) => {
          const { id, present } = row.original;
          return (
            <div className='flex items-center gap-4'>
              <label className='flex cursor-pointer items-center'>
                <Input
                  type='radio'
                  name={`attendance-${id}`}
                  checked={present === true}
                  onChange={() => handleAttendanceChange(id, true)}
                  className='peer sr-only'
                />

                <div className='rounded-full px-3 py-1 text-sm font-medium transition-colors peer-checked:bg-green-500 peer-checked:text-white hover:bg-green-100 border border-green-500 text-green-500'>
                  Present
                </div>
              </label>

              <label className='flex cursor-pointer items-center'>
                <Input
                  type='radio'
                  name={`attendance-${id}`}
                  checked={present === false}
                  onChange={() => handleAttendanceChange(id, false)}
                  className='peer sr-only'
                />
                <div className='rounded-full px-3 py-1 text-sm font-medium transition-colors peer-checked:bg-red-500 peer-checked:text-white hover:bg-red-100 border border-red-500 text-red-500'>
                  Absent
                </div>
              </label>
            </div>
          );
        },
      },
    ],
    [students]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredStudents,
    });

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='flex flex-wrap gap-4 mb-6'>
        <Select
          label='Student Standard'
          options={[
            "Select",
            "Standard 10",
            "Standard 12",
            "Standard 11",
          ]}
        />
        <Select
          label='Student Division'
          options={[
            "Select",
            "Division A", 
            "Division B",
          ]}
        />
      </div>

      <div className='mx-auto max-w-8xl bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white'>
          <h1 className='text-3xl font-bold'>Attendance Sheet</h1>
          <div className='flex items-center space-x-4 mt-2'>
            <span className='text-lg'>{currentDate}</span>
            <span>•</span>
            <span className='text-lg'>{currentDay}</span>
          </div>
        </div>
        <div className='p-6'>
          <div className='flex flex-wrap gap-4 mb-6'>
            {/* <button
              onClick={markAllPresent}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Mark All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Mark All Absent
            </button> */}
            <ButtonComponent className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                 Mark All Present
            </ButtonComponent>

            <ButtonComponent className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                Mark All Absent
            </ButtonComponent>

          </div>

          <div className='overflow-x-auto'>
            <table className='w-full' {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className='bg-white divide-y divide-gray-200'
                {...getTableBodyProps()}
              >
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className='hover:bg-gray-50'>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className='px-6 py-4 whitespace-nowrap'
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className='flex justify-end mt-6'>
            <ButtonComponent className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Submit Attendance
</ButtonComponent>

          </div>
        </div>
      </div>
    </div>
  );
}
