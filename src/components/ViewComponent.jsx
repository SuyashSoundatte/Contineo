import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ViewComponent = () => {

  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/getUsers");
        const userData = response.data;

      
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, );

  

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <label><strong>First Name:</strong></label>
          <p>{userData.fname}</p>
        </div>

        <div>
          <label><strong>Middle Name:</strong></label>
          <p>{userData.mname}</p>
        </div>

        <div>
          <label><strong>Last Name:</strong></label>
          <p>{userData.lname}</p>
        </div>

        <div>
          <label><strong>Email:</strong></label>
          <p>{userData.email}</p>
        </div>

        <div>
          <label><strong>Phone:</strong></label>
          <p>{userData.phone}</p>
        </div>

        <div>
          <label><strong>Address:</strong></label>
          <p>{userData.address}</p>
        </div>

        <div>
          <label><strong>Gender:</strong></label>
          <p>{userData.gender}</p>
        </div>

        <div>
          <label><strong>Date of Birth:</strong></label>
          <p>{userData.dob}</p>
        </div>

        <div>
          <label><strong>Role:</strong></label>
          <p>{userData.role}</p>
        </div>
      </div>
    </div>
  );
};



export default ViewComponent;
