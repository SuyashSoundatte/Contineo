import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import { useAuth } from "../context/AuthContext";

const StudentMarks = () => {
  const [data, setData] = useState([]);
  const [averageMarks, setAverageMarks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { phone } = useAuth();

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
          `http://localhost:3000/api/v1/getStuByRoll/${phone}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);
        console.log(response.data.message.recordset)
        // Ensure correct data extraction
        if (response.data?.message?.recordset) {
          setData(response.data.message.recordset);

          // Calculate average marks
          const totalMarks = response.data.message.recordset.reduce(
            (sum, record) => sum + parseFloat(record.marks),
            0
          );
          const avgMarks =
            response.data.message.recordset.length > 0
              ? totalMarks / response.data.message.recordset.length
              : 0;

          setAverageMarks(avgMarks);
        } else {
          setError("No exam records found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [phone]);

  const customColumns = [
    { name: "Sr No", selector: (row, index) => index + 1, sortable: false },
    { name: "Exam Name", selector: (row) => row.Exam_Name, sortable: true },
    {
      name: "Marks",
      selector: (row) => (
        <div className='flex items-center'>
          <span className='mr-2'>{row.marks}</span>
          <div className='w-24 bg-gray-200 rounded-full h-2'>
            <div
              className={`h-full rounded-full ${
                row.marks >= 90
                  ? "bg-green-500"
                  : row.marks >= 80
                    ? "bg-blue-500"
                    : row.marks >= 70
                      ? "bg-yellow-500"
                      : "bg-red-500"
              }`}
              style={{ width: `${row.marks}%` }}
            ></div>
          </div>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div className='p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md'>
      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : (
        <>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              Student Exam Marks
            </h2>
            <div className='bg-blue-50 px-4 py-2 rounded-lg'>
              <span className='text-sm text-gray-600'>Average Score:</span>
              <span className='ml-2 font-bold text-blue-600'>
                {averageMarks.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className='bg-gray-50 rounded-lg p-4 mb-6'>
            <Table records={data} customColumns={customColumns} loading={loading} error={error} />
          </div>
        </>
      )}
    </div>
  );
};

export default StudentMarks;
