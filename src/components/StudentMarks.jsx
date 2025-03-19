import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import { useAuth } from "../context/AuthContext";

const MAX_MARKS_MAPPING = {
  NEET: 720,
  JEE: 300,
  CET: 200, // Add more if needed
};

const StudentMarks = () => {
  const [data, setData] = useState([]);
  const [averageMarks, setAverageMarks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);

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

        const resultMarks = response.data.data.result_marks || [];
        
        if (resultMarks.length > 0) {
          const processedData = resultMarks.map(record => {
            const examName = record.Exam_Name || "";
            const totalMarks = MAX_MARKS_MAPPING[examName] || 100; // Default to 100 if not found
            setTotalMarks(totalMarks);
            const marks = parseFloat(record.marks);
            return {
              examName,
              marks,
              date: record.Exam_Date,
              subject: examName,
              subtopics: "",
              title: `Marks: ${marks}`,
              percentage: (marks / totalMarks) * 100, // Normalize marks based on exam max score
            };
          });

          setData(processedData);

          // Calculate average marks as a percentage of each exam's total marks
          const totalPercentage = processedData.reduce(
            (sum, record) => sum + record.percentage,
            0
          );
          setAverageMarks(totalPercentage / processedData.length);
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
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Exam Name",
      selector: (row) => row.examName,
      sortable: true,
    },
    {
      name: "Exam Date",
      selector: (row) => row.date ? new Date(row.date).toLocaleDateString() : "N/A",
      sortable: true,
    },
    {
      name: "Marks",
      selector: (row) => (
        <div className="flex items-center">
          <span className="mr-2">{row.marks}</span>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div
              className={`h-full rounded-full ${
                row.percentage >= 80
                  ? "bg-green-500"
                  : row.percentage >= 60
                  ? "bg-blue-500"
                  : row.percentage >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${row.percentage}%` }}
            ></div>
          </div>
        </div>
      ),
      sortable: true,
    },
  ];

  // Calculate highest and lowest scores
  const highestScoreExam = data.reduce((max, item) => (item.marks > (max?.marks || 0) ? item : max), null);
  const lowestScoreExam = data.reduce((min, item) => (item.marks < (min?.marks || Infinity) ? item : min), null);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Student Exam Marks
            </h2>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Average Score:</span>
              <span className="ml-2 font-bold text-blue-600">
                {averageMarks.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Performance Overview</span>
              <span className="text-sm text-gray-500">Total Exams: {data.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${averageMarks}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <Table 
              records={data} 
              customColumns={customColumns} 
              loading={loading}
              error={error}
            />
          </div>
          
          {data.length > 0 && highestScoreExam && lowestScoreExam && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Highest Score</h3>
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full mr-3">
                    <span className="text-green-700 font-bold">
                      {highestScoreExam.marks} / {totalMarks}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{highestScoreExam.examName}</p>
                    <p className="text-sm text-gray-500">
                      {highestScoreExam.date ? new Date(highestScoreExam.date).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Lowest Score</h3>
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full mr-3">
                    <span className="text-yellow-700 font-bold">
                      {lowestScoreExam.marks} / {totalMarks}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{lowestScoreExam.examName}</p>
                    <p className="text-sm text-gray-500">
                      {lowestScoreExam.date ? new Date(lowestScoreExam.date).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentMarks;
