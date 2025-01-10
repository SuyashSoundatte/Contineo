import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
       
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
