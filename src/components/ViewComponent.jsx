import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewComponent = () => {
  const [userData, setUserData] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    role: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/getUsers");
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, []);

  const InfoItem = ({ label, value }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <p className="text-lg text-gray-800">{value || "N/A"}</p>
    </div>
  );

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

