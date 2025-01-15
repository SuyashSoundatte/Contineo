import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; // Use axios for API calls
import Select from "../components/Select";
import ButtonComponent from "../components/ButtonComponent";
import AddFiles from "../components/AddFiles";
import Input from "../components/Input";

const TeacherMasterForm = () => {
  const { user_id } = useParams(); // Access the userId parameter from the URL
  const [userData, setUserData] = useState(null); // Store fetched user data
  const [loading, setLoading] = useState(false); // State for loading indicator

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Log the user_id to verify it's passed correctly
        console.log("User ID from URL:", user_id);

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in again.");
          return;
        }
        setLoading(true);

        // Make the API request
        const response = await axios.get(
          `http://localhost:3000/api/v1/getUserById/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Attach the token to the Authorization header
            }
          }
        );
// Log the fetched user data

        const user = response.data.data;
        setUserData(user);

        // Pre-fill form fields with the fetched user data
        setValue("user_id", user.user_id);
        setValue("fname", user.fname);
        setValue("mname", user.mname);
        setValue("lname", user.lname);
        setValue("role", user.role);

      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          console.error("Response data:", error.response.data); // Log detailed error response
        }
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      fetchUserData();
    }
  }, [user_id, setValue]);

  // File change handler
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
  };

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      console.log("Submitting form data:", data);
      // const response = await axios.post("http://your-backend-api-url/users/update", data);
      console.log("Form submission successful:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit the form.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  if (!userData) {
    return <div>No user data found!</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[70%]">
        <h1 className="text-2xl font-bold mb-6">User Information Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-4  w-[calc(100%/2)]">
              <div className="flex flex-col w-[calc(100%/2)]">
                <label>ID</label>
                <Input
                  type="text"
                  value={userData.id}
                  readOnly
                  {...register("user_id")}
                />
              </div>
              <div className="flex flex-col w-[calc(100%/2)]">
                <label>First Name</label>
                <Input
                  type="text"
                  defaultValue={userData.fname}
                  {...register("fname", { required: "First Name is required" })}
                />
              </div>
              <div className="flex flex-col w-[calc(100%/2)]">
                <label>Last Name</label>
                <Input
                  type="text"
                  defaultValue={userData.lname}
                  {...register("lname", { required: "Last Name is required" })}
                />
              </div>
            </div>
          </div>
          {/* Additional Fields */}
          <h1>Add Documents</h1>
          <AddFiles onFileChange={handleFileChange} />
          <div>
            <ButtonComponent type="submit">Submit</ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherMasterForm;
