import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios"; // Install this if you haven't: npm install axios

const UserCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send data to the backend
      const response = await axios.post("http://localhost:5000/api/users/create", data);

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
    <div className='flex justify-center items-center absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%]'>
      <div className='w-[70%]'>
        <h1 className='text-2xl font-bold mb-6'>User Information Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex justify-between items-center gap-2'>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='First Name'
                type='text'
                name='firstName'
                placeholder='First Name'
                {...register("firstName", { required: "First Name is required" })}
              />
              {errors.firstName && (
                <p className='text-red-500 text-sm'>
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='Middle Name'
                type='text'
                name='middleName'
                placeholder='Middle Name'
                {...register("middleName", { required: "Middle Name is required" })}
              />
              {errors.middleName && (
                <p className='text-red-500 text-sm'>
                  {errors.middleName.message}
                </p>
              )}
            </div>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='Last Name'
                type='text'
                name='lastName'
                placeholder='Last Name'
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className='text-red-500 text-sm'>
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center gap-2'>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='Address'
                type='textarea'
                name='address'
                placeholder='Enter Address'
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className='text-red-500 text-sm'>{errors.address.message}</p>
              )}
            </div>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Select
                label='Gender'
                options={["Male", "Female"]}
                {...register("gender", { required: "Gender is required" })}
              />
              {errors.gender && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='Date of Birth'
                type='date'
                name='dob'
                placeholder='Enter Date of Birth'
                {...register("dob", { required: "Date of Birth is required" })}
              />
              {errors.dob && (
                <p className='text-red-500 text-sm'>{errors.dob.message}</p>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col w-1/2'>
              <Input
                label='Email'
                type='email'
                name='email'
                placeholder='Enter Email'
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>
            <div className='flex flex-col w-1/2'>
              <Input
                label='Password'
                type='password'
                name='password'
                placeholder='Enter Password'
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center gap-2'>
            <div>
              <Input
                label='Phone Number'
                type='number'
                name='phone'
                placeholder='Enter Phone Number'
                {...register("phone", { required: "Phone Number is required" })}
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Select
                label='Role'
                options={["Teacher", "Office Staff"]}
                {...register("role", { required: "Role is required" })}
                className='w-96'
              />
              {errors.role && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <ButtonComponent type='submit'>Submit</ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
