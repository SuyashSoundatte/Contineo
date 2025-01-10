import React from "react";
import { useForm } from "react-hook-form";

const TeacherForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex">
  {/* Sidebar (20% width) */}
  <div className="w-2/12 bg-#[fffff] p-6">
    {/* Side dashboard content can go here */}
  </div>

  {/* Form Section (80% width) */}
  <div className="w-4/5 p-8">
    <h1 className="text-2xl font-bold mb-6">Teacher Admission Form</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-6">
      {/* Input Fields */}
      <div>
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          {...register("firstName", { required: "First Name is required" })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="First Name"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2">Middle Name</label>
        <input
          type="text"
          {...register("middleName")}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Middle Name"
        />
      </div>
      <div>
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          {...register("lastName", { required: "Last Name is required" })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Last Name"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>

      <div className="col-span-3">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          {...register("email", { required: "email is required" })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
        />
        {email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">Password</label>
        <input
          type="text"
          {...register("password", { required: "password is required" })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2">Gender</label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2">Date of Birth</label>
        <input
          type="date"
          {...register("dob", { required: "Date of Birth is required" })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm">{errors.dob.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">Education</label>
        <input
          type="text"
          {...register("education", { required: "education is required"})}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your Education"
        />
        {education && (
          <p className="text-red-500 text-sm">{errors.education.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2">Caste Category</label>
        <input
          type="text"
          {...register("casteCategory", {
            required: "Caste Category is required",
          })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter caste category"
        />
        {errors.casteCategory && (
          <p className="text-red-500 text-sm">{errors.casteCategory.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2">subject</label>
        <input
          type="text"
          {...register("subject", {
            required: "subject Marks are required",
          })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter subject"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject.message}</p>
        )}
      </div>

      <div className="col-span-3">
        <label className="block mb-2">Documents</label>
        <div className="flex space-x-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            docs1
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            docs 2
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Other Documents
          </button>
        </div>
      </div>

      <div className="col-span-3 text-right">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default TeacherForm;
