import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
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
        console.log("User ID from URL:", user_id);

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in again.");
          return;
        }
        setLoading(true);

        const response = await axios.get(
          `http://localhost:3000/api/v1/getUserById/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
          console.error("Response data:", error.response.data);
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
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found!</div>;
  }

  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">User Information Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ID and Name Fields */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <Input
                id="user_id"
                type="text"
                value={userData.id}
                readOnly
                {...register("user_id")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                id="fname"
                type="text"
                defaultValue={userData.fname}
                {...register("fname", { required: "First Name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.fname && <span className="text-red-500 text-xs">{errors.fname.message}</span>}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                id="lname"
                type="text"
                defaultValue={userData.lname}
                {...register("lname", { required: "Last Name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.lname && <span className="text-red-500 text-xs">{errors.lname.message}</span>}
            </div>
          </div>
        </div>

        {/* Add Documents Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Add Documents</h2>
          <AddFiles onFileChange={handleFileChange} />
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          <ButtonComponent type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default TeacherMasterForm;
