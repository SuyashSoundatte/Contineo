import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios"; // Install this if you haven't: npm install axios

const StudentCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
      };

      const formattedData = {
        ...data,
        DOB: formatDate(data.DOB), // Replace DOB with the formatted date
      };
      
      const token = localStorage.getItem("token");
      // Send data to the backend
      const response = await axios.post("http://localhost:3000/api/v1/createUser", formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the header
          }
        }
      );

      // Log the response or show success feedback
      console.log("User created successfully:", response.data);
      alert("User created successfully!");
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", error.response?.data || error.message);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Information Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Input
                  label="First Name"
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  {...register("fname", { required: "First Name is required" })}
                />
                {errors.fname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="Middle Name"
                  type="text"
                  name="mname"
                  placeholder="Middle Name"
                  {...register("mname", { required: "Middle Name is required" })}
                />
                {errors.mname && (
                  <p className="text-red-500 text-sm mt-1">{errors.mname.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="Last Name"
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  {...register("lname", { required: "Last Name is required" })}
                />
                {errors.lname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lname.message}</p>
                )}
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Input
                  label="Address"
                  type="textarea"
                  name="address"
                  placeholder="Enter Address"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
              <div>
                <Select
                  label="Gender"
                  options={["Male", "Female"]}
                  {...register("gender", { required: "Gender is required" })}
                />
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="Date of Birth"
                  type="date"
                  name="DOB"
                  placeholder="Enter Date of Birth"
                  {...register("DOB", { required: "Date of Birth is required" })}
                />
                {errors.DOB && (
                  <p className="text-red-500 text-sm mt-1">{errors.DOB.message}</p>
                )}
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="Roll Number"
                  type="text"
                  name="rollnumber"
                  placeholder="Enter Roll Number"
                  {...register("rollnumber", { required: "Roll Number is required" })}
                />
                {errors.rollnumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.rollnumber.message}</p>
                )}
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  {...register("phone", { required: "Phone Number is required" })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Select
                  label="Role"
                  options={["Student"]}
                  {...register("role", { required: "Role is required" })}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                )}
              </div>
            </div>
  
            <div className="flex justify-center">
              <ButtonComponent type="submit" className="w-full sm:w-auto px-8 py-3 text-lg">
                Submit
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default StudentCreate;
