import React from "react";
import Table from "./Table";
import { useNavigate } from 'react-router-dom';

const StudentMarks = () => {
  const navigate = useNavigate();
  
  // Restructured dummy data to match the fields your Table component expects
  const data = [
    { 
      sub_id: "M101", 
      subject: "Mathematics", 
      subtopics: "Algebra", 
      title: "Mid-term Exam",
      examDate: "2025-02-10", 
      marks: 85 
    },
    { 
      sub_id: "S102", 
      subject: "Science", 
      subtopics: "Physics", 
      title: "Quarter Final",
      examDate: "2025-02-15", 
      marks: 90 
    },
    { 
      sub_id: "E103", 
      subject: "English", 
      subtopics: "Grammar", 
      title: "Weekly Test",
      examDate: "2025-02-20", 
      marks: 78 
    },
    { 
      sub_id: "H104", 
      subject: "History", 
      subtopics: "World War II", 
      title: "Assignment",
      examDate: "2025-02-25", 
      marks: 88 
    },
    { 
      sub_id: "G105", 
      subject: "Geography", 
      subtopics: "Climate", 
      title: "Final Exam",
      examDate: "2025-03-01", 
      marks: 92 
    },
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3000/api/v1/getStuByRoll", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Custom columns for student marks that match the structure your Table expects
  const customColumns = [
    {
      name: "Subject ID",
      selector: row => row.sub_id,
      sortable: true,
    },
    {
      name: "Subject",
      selector: row => row.subject,
      sortable: true,
    },
    {
      name: "Subtopics",
      selector: row => row.subtopics,
      sortable: true,
    },
    {
      name: "Exam Title",
      selector: row => row.title,
      sortable: true,
    },
    {
      name: "Date",
      selector: row => row.examDate,
      sortable: true,
    },
    {
      name: "Marks",
      selector: row => row.marks,
      sortable: true,
      cell: row => (
        <div className="flex items-center">
          <span className="mr-2">{row.marks}</span>
          <div className="w-16 bg-gray-200 rounded-full h-2">
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
    },
    {
      name: "Action",
      cell: row => (
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={() => alert(`Details for ${row.subject}`)}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Student Exam Marks</h2>
      
      {/* Table with data structure matching what the Table component expects */}
      <Table 
        records={data} 
        customColumns={customColumns} 
        loading={false} 
        error={null} 
      />
    </div>
  );
};

export default StudentMarks;