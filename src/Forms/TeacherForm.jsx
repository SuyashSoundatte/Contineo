import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";

const TeacherForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Selected file:", selectedFile);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className='flex'>
      {/* Sidebar (20% width) */}
      <div className='w-2/12 bg-#[fffff] p-6'>
        {/* Side dashboard content can go here */}
      </div>

      {/* Form Section (80% width) */}
      <div className='w-4/5 p-8'>
        <h1 className='text-2xl font-bold mb-6'>Teacher Information Form</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-3 gap-6'
        >
          {/* Input Fields */}
          <div>
            <label className='block mb-2'>First Name</label>
            <Input
              type='text'
              name='firstName'
              placeholder='First Name'
              {...register("firstName", { required: "First Name is required" })}
              className='w-full p-2 border border-gray-300 rounded'
            />
            {errors.firstName && (
              <p className='text-red-500 text-sm'>{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className='block mb-2'>Middle Name</label>
            <Input
              type='text'
              name='middleName'
              {...register("middleName")}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Middle Name'
            />
          </div>
          <div>
            <label className='block mb-2'>Last Name</label>
            <Input
              type='text'
              name='lastName'
              {...register("lastName", { required: "Last Name is required" })}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Last Name'
            />
            {errors.lastName && (
              <p className='text-red-500 text-sm'>{errors.lastName.message}</p>
            )}
          </div>

          <div className='col-span-3'>
            <label className='block mb-2'>Address</label>
            <Input
              type='text'
              name='address'
              {...register("address", { required: "Address is required" })}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your address'
            />
            {errors.address && (
              <p className='text-red-500 text-sm'>{errors.address.message}</p>
            )}
          </div>
            
          <div>
            <label className='block mb-2'>Qualification</label>
            <Input
              type='text'
              {...register("qualification", { required: "qualification is required" })}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter qualification'
            />
            {errors.qualification && (
              <p className='text-red-500 text-sm'>{errors.qualification.message}</p>
            )}
          </div>
          <div>
            <label className='block mb-2'>Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className='w-full p-2 border border-gray-300 rounded'
            >
              <option value=''>Select</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            {errors.gender && (
              <p className='text-red-500 text-sm'>{errors.gender.message}</p>
            )}
          </div>
          <div>
            <label className='block mb-2'>Date of Birth</label>
            <Input
              type='date'
              {...register("dob", { required: "Date of Birth is required" })}
              className='w-full p-2 border border-gray-300 rounded'
            />
            {errors.dob && (
              <p className='text-red-500 text-sm'>{errors.dob.message}</p>
            )}
          </div>

          <div>
            <label className='block mb-2'>Specialization</label>
            <Input
              type='text'
              {...register("specialization")}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter specialization'
            />
          </div>
          <div>
            <label className='block mb-2'>Years of Experience</label>
            <Input
              type='text'
              {...register("experience", {
                required: "Experience is required",
              })}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter Experience'
            />
            {errors.experience && (
              <p className='text-red-500 text-sm'>
                {errors.experience.message}
              </p>
            )}
          </div>
          <div>
            <label className='block mb-2'>Profile Photo</label>
            <Input
              type='text'
              {...register("profilePhoto", {
                required: "profile photo is required",
              })}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter profile photo'
            />
            {errors.profilePhoto && (
              <p className='text-red-500 text-sm'>
                {errors.profilePhoto.message}
              </p>
            )}
          </div>

          <div className="col-span-3">
            <label className="block mb-2">Upload Documents</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
            />
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
