import React, { useState, useMemo } from "react";
import { useTable } from "react-table";

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

  // Define columns for the react-table
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the key in data
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
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={`attendance-${id}`}
                  checked={present === true}
                  onChange={() => handleAttendanceChange(id, true)}
                  className="peer hidden"
                />
                <div className="flex items-center gap-1 rounded-full border border-[#1a56db] px-3 py-1 text-sm text-[#1a56db] transition-colors hover:bg-[#1a56db] hover:text-white peer-checked:bg-[#1a56db] peer-checked:text-white">
                  Present
                </div>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={`attendance-${id}`}
                  checked={present === false}
                  onChange={() => handleAttendanceChange(id, false)}
                  className="peer hidden"
                />
                <div className="flex items-center gap-1 rounded-full border border-[#1a56db] px-3 py-1 text-sm text-[#1a56db] transition-colors hover:bg-[#1a56db] hover:text-white peer-checked:bg-[#1a56db] peer-checked:text-white">
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

  // Use the useTable hook to get table props and rows
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredStudents,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h1 className="text-xl font-semibold">Attendance Sheet</h1>
            <div className="flex items-center space-x-4">
              <span>{currentDate}</span>
              <span>•</span>
              <span>{currentDay}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={markAllPresent}
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              Mark All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
            >
              Mark All Absent
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <select
              value={selectedStandard}
              onChange={handleStandardChange}
              className="border p-2 rounded"
            >
              <option value="">Select Standard</option>
              <option value="10">Standard 10</option>
              <option value="12">Standard 12</option>
            </select>
            <select
              value={selectedDivision}
              onChange={handleDivisionChange}
              className="border p-2 rounded"
            >
              <option value="">Select Division</option>
              <option value="A">Division A</option>
              <option value="B">Division B</option>
            </select>
          </div>

          {/* Render React Table */}
          <div className="rounded-lg border">
            <table className="w-full" {...getTableProps()}>
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-600"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y" {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="hover:bg-gray-50">
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="px-6 py-4"
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

          <div className="flex justify-end mt-4">
            <button
              onClick={submitAttendance}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
