import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewComponent = () => {
  const [users, setUsers] = useState([]); // Store the list of users
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user's details
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/v1/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 

        // Store the users data
        setUsers(response.data.data || response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle viewing a specific user's profile
  const handleViewClick = (user_id) => {
    const user = users.find((user) => user.user_id === user_id);
    setSelectedUser(user); // Set the selected user
  };

  // Info item component to display each piece of information
  const InfoItem = ({ label, value }) => (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <p className="text-base text-gray-900">{value || "N/A"}</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

        {/* Show loading spinner or text while data is being fetched */}
        {loading && <p>Loading...</p>}

        {/* Display the list of users if no user is selected */}
        {!selectedUser && !loading && (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">User List</h2>
            {users.map((user) => (
              <div
                key={user.user_id}
                className="flex justify-between items-center bg-white p-4 border rounded-md shadow-sm mb-4"
              >
                <div>
                  <p className="font-bold text-lg">{user.fname} {user.lname}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => handleViewClick(user.user_id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Show selected user's profile details */}
        {selectedUser && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">User Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="First Name:" value={selectedUser.fname} />
              <InfoItem label="Middle Name:" value={selectedUser.mname} />
              <InfoItem label="Last Name:" value={selectedUser.lname} />
              <InfoItem label="Email:" value={selectedUser.email} />
              <InfoItem label="Phone:" value={selectedUser.phone} />
              <InfoItem label="Gender:" value={selectedUser.gender} />
              <InfoItem label="Date of Birth:" value={selectedUser.dob} />
              <InfoItem label="Role:" value={selectedUser.role} />
              <InfoItem label="Address:" value={selectedUser.address} />
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Back to User List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewComponent;
