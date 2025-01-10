import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <h3 className="font-medium">Admission</h3>
          <ul className="pl-4">
            <li className="text-sm mb-1 hover:text-blue-400 cursor-pointer">
              Master Form
            </li>
            <li className="text-sm mb-1 hover:text-blue-400 cursor-pointer">
              Document Collection
            </li>
            <li className="text-sm hover:text-blue-400 cursor-pointer">
              Subject Master
            </li>
          </ul>
        </li>
        <li className="mb-2">
          <h3 className="font-medium">Teacher</h3>
          <ul className="pl-4">
            <li className="text-sm mb-1 hover:text-blue-400 cursor-pointer">
              Teacher Master Form
            </li>
            <li className="text-sm mb-1 hover:text-blue-400 cursor-pointer">
              Class Teacher Allotment
            </li>
            <li className="text-sm mb-1 hover:text-blue-400 cursor-pointer">
              Teacher Allotment
            </li>
            <li className="text-sm hover:text-blue-400 cursor-pointer">
              Mentor Allotment
            </li>
          </ul>
        </li>
        <li>
          <h3 className="font-medium">Student</h3>
          <ul className="pl-4">
            <li className="text-sm mb-1 hover:text-blue-400 cursor-pointer">
              Student Allotment
            </li>
            <li className="text-sm hover:text-blue-400 cursor-pointer">
              Student Attendance
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;