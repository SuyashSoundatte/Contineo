import React from "react";
import { Link } from "react-router-dom";

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
    <aside className='w-60 h-screen bg-gray-800 text-white shadow-md fixed left-0 top-0 bottom-0 py-8 px-1'>
      <div className='py-4 px-6'>
        <h1 className='text-2xl font-semibold text-blue-400'>Dashboard</h1>
      </div>
      <nav className='mt-4'>
        <ul>
          <li className='group'>
            <div className='px-6 py-3 text-gray-400 group-hover:bg-gray-700 group-hover:text-white transition-all '>
              <span className='text-lg font-medium'>Teacher</span>
            </div>
            <ul className='ml-4 text-sm mt-1 space-y-1'>
              <Link to=''>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
                  Teacher Master Form
                </li>
              </Link>
              <Link to=''>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
                  Class Teacher Allotment
                </li>
              </Link>
              <Link to=''>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
                  Teacher Allotment
                </li>
              </Link>
              <Link to=''>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
                  Mentor Allotment
                </li>
              </Link>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Dashboard;
