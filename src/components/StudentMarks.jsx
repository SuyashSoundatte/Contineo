// import React from "react";
// import { useEffect, useState } from "react";
// import Table from "./Table";

// const StudentMarks = () => {
//   // Dummy data for demonstration
//   const data = [
//     { examName: "Maths", date: "2025-02-10", marks: 85 },
//     { examName: "Science", date: "2025-02-15", marks: 90 },
//     { examName: "English", date: "2025-02-20", marks: 78 },
//     { examName: "History", date: "2025-02-25", marks: 88 },
//     { examName: "Geography", date: "2025-03-01", marks: 92 },
//   ];

//   useEffect(() => {
//       fetchData();
//     }, []);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Token not found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/getStuByRoll/:${roll_no}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const enrichedData = response.data.data.map((record) => ({
//           ...record,
//           selected: false,
//           div: record.div || null,
//         }));

//         setRecords(enrichedData);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.response?.data?.message || "Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//   const customColumns = [
//     {
//       name: "Sr No",
//       selector: (row, index) => index + 1,
//       sortable: false,
//     },
//     {
//       name: "Exam Name",
//       selector: (row) => row.examName,
//       sortable: true,
//     },
//     {
//       name: "Exam Date",
//       selector: (row) => row.date,
//       sortable: true,
//     },
//     {
//       name: "Marks",
//       selector: (row) => row.marks,
//       sortable: true,
//     },
//   ];

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Student Exam Marks</h2>
//       <Table records={data} customColumns={customColumns} loading={false} error={null} />
//     </div>
//   );
// };

// export default StudentMarks;

import React from 'react'
import Table from "./Table"

const StudentMarks = () => {
  // Dummy data for demonstration
  const data = [
    { examName: "Maths", date: "2025-02-10", marks: 85 },
    { examName: "Science", date: "2025-02-15", marks: 90 },
    { examName: "English", date: "2025-02-20", marks: 78 },
    { examName: "History", date: "2025-02-25", marks: 88 },
    { examName: "Geography", date: "2025-03-01", marks: 92 },
  ];

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
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Marks",
      selector: (row) => row.marks,
      sortable: true,
    },
  ];

  return (
    <>
      <div>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Student Exam Marks</h2>
          <Table
            records={data}
            customColumns={customColumns}
            loading={false}
            error={null}
          />
        </div>
      </div>
    </>
  );
};

export default StudentMarks;
