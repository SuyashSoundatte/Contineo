import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { UserCircle } from "lucide-react";
import { fetchStudentByRoll } from "../services/api.js";

const StudentInfoCard = () => {
  const { mobile } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await fetchStudentByRoll(mobile);
        setStudent(studentData.student);
        console.log(studentData.student);
      } catch (err) {
        setError(err?.message || String(err) || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [mobile]);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full max-w-7xl h-48 rounded-lg bg-gray-100">
        <div className="animate-pulse text-gray-600">Loading student data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full max-w-7xl h-48 rounded-lg bg-red-50 border border-red-200">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center w-full max-w-7xl h-48 rounded-lg bg-gray-100">
        <p className="text-gray-500">No student data found.</p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full max-w-7xl h-56 rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
      {/* Left section */}
      <div className="bg-blue-600 w-2/5 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold">
            {student.firstname} {student.lastname}
          </h1>
          <p className="mt-2 opacity-80">Student</p>
        </div>
      </div>

      {/* Profile picture */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
          {student.profileImage && !imageError ? (
            <img
              src={student.profileImage}
              alt={`${student.firstname} ${student.lastname}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
              <UserCircle size={64} />
            </div>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="bg-gray-50 w-3/5 p-6 flex flex-col">
        <div className="text-right mt-4 space-y-2">
          <div className="flex justify-end items-center">
            <p className="text-gray-500 mr-2">Class:</p>
            <p className="text-lg font-medium">{student.course_name}</p>
          </div>
          <div className="flex justify-end items-center">
            <p className="text-gray-500 mr-2">Roll No:</p>
            <p className="text-lg font-medium">{student.roll_no}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;