import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/api";

const ViewComponent = () => {
  const { user_id } = useParams();
  const [userData, setUserData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to track mounted state

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found. Please log in again.");
        }

        const response = await getUserById(user_id);
        console.log("API Response:", response); // Debug log

        // Handle different response structures
        const responseData = response?.data?.data || response?.data || response;

        if (!responseData || typeof responseData !== "object") {
          throw new Error("Invalid user data format");
        }

        if (isMounted) {
          setUserData(responseData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [user_id]);

  const InfoItem = ({ label, value }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <p className="text-lg text-gray-800">{value || "N/A"}</p>
    </div>
  );

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center py-8">No user data available</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="First Name" value={userData.fname} />
            <InfoItem label="Middle Name" value={userData.mname} />
            <InfoItem label="Last Name" value={userData.lname} />
            <InfoItem label="Email" value={userData.email} />
            <InfoItem label="Phone" value={userData.phone} />
            <InfoItem label="Gender" value={userData.gender} />
            <InfoItem label="Date of Birth" value={userData.dob} />
            <InfoItem label="Role" value={userData.role} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <InfoItem label="Address" value={userData.address} />
        </div>
      </div>
    </div>
  );
};

export default ViewComponent;