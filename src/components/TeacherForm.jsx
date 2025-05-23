import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent, ReactTable } from "./component.js";
import { getAllUsers } from "../services/api.js";

const TeacherForm = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers();

        const enrichedData = response
          .filter((row) => row.role !== "Student") // Exclude users with role 'Student'
          .map((row) => {
            return {
              ...row,
              role: row.role === "OfficeStaff" ? "Office Staff" : "Teacher", // Map roles
            };
          });

          console.log(enrichedData);

        setRecords(enrichedData);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const staffColumns = [
    {
      name: "Staff ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone no",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <ButtonComponent
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          onClick={() => navigate(`/MainPage/ViewComponent/${row.user_id}`)}
        >
          View Staff
        </ButtonComponent>
      ),
    },
  ];

  return (
    <div className='w-full max-w-8xl mx-auto p-4 space-y-6'>
      <div className="flex items-center justify-between mb-8">
  <h1 className="text-2xl font-semibold text-gray-900">Staff List</h1>
  <div>
    <ButtonComponent 
      className="w-full sm:w-auto px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
      onClick={() => navigate("/MainPage/UserForm")}>
      Add New Staff
    </ButtonComponent>
  </div>
</div>
      <ReactTable
        records={records}
        loading={loading}
        error={error}
        customColumns={staffColumns}
      />
    </div>
  );
};

export default TeacherForm;
