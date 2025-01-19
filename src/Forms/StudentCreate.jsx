import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Input,
  Select,
  ButtonComponent,
  AddSubjects,
} from "../components/component.js";
import DocumentUploadForm from "../components/DocumentUploadForm";

const UserCreate = () => {
  const [createdUserId, setCreatedUserId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.files[0];
    console.log("Selected Subject:", selectedSubject);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
      };

      const formattedData = {
        ...data,
        dob: formatDate(data.dob),
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/createUser",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User created successfully:", response.data);
      alert("User created successfully!");
      setCreatedUserId(response.data.id);
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* User Information Form */}
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            User Information Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Input
                label="First Name"
                type="text"
                name="fname"
                placeholder="First"
                {...register("fname", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Middle Name"
                type="text"
                name="mname"
                placeholder="Middle"
                {...register("mname", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Last Name"
                type="text"
                name="lname"
                placeholder="Last"
                {...register("lname", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
            </div>
            {(errors.fname || errors.lname) && (
              <p className="text-red-500 text-sm mt-1">
                First and last name are required
              </p>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", { required: "Required" })}
                  className="w-full px-4 py-2 text-base"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  {...register("phone", { required: "Required" })}
                  className="w-full px-4 py-2 text-base"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  {...register("password", { required: "Required" })}
                  className="w-full px-4 py-2 text-base"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  {...register("dob", { required: "Required" })}
                  className="w-full px-4 py-2 text-base"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dob.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Select
                label="Gender"
                options={["Male", "Female", "Other"]}
                {...register("gender", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
              <Select
                label="Role"
                options={[
                  "Role",
                  "Teacher",
                  "OfficeStaff",
                  "Mentor",
                  "ClassIn",
                  "MentorIn",
                  "ClassTeacher",
                ]}
                {...register("role", { required: "Required" })}
                onChange={handleRoleChange}
                className="w-full px-4 py-2 text-base"
              />
            </div>
            {(errors.gender || errors.role) && (
              <p className="text-red-500 text-sm mt-1">
                Gender and Role are required
              </p>
            )}

            <div>
              <Input
                label="Address"
                type="text"
                name="address"
                placeholder="Enter Address"
                {...register("address", { required: "Required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {selectedRole === "Teacher" && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  Add Subject
                </h2>
                <AddSubjects onSubjectChange={handleSubjectChange} />
              </div>
            )}

            <div className="flex justify-end mt-8">
              <ButtonComponent
                type="submit"
                className="w-full sm:w-auto px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
              >
                Create User
              </ButtonComponent>
            </div>
          </form>
        </div>

        {/* Document Upload Form */}
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Document Upload
          </h2>
          {createdUserId ? (
            <DocumentUploadForm userId={createdUserId} isDisabled={false} />
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <svg
                className="w-14 h-14 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l7.414 7.414A1 1 0 0121 11.586V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <p className="text-lg text-gray-600">
                Create a user to enable document uploads.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
