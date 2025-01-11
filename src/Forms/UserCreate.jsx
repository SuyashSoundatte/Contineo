import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";
import { Button } from "@mui/material";
import ButtonComponent from "../components/ButtonComponent";

const UserCreate = () => {
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
    <div className='flex justify-center items-center'>
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
                {...register("firstName", {
                  required: "First Name is required",
                })}
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
                {...register("middleName", {
                  required: "Middle Name is required",
                })}
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
                {...register("lastName", { required: "Last Name is required" })}
                placeholder='Last Name'
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
                {...register("address", { required: "Address is required" })}
                placeholder='Enter Address'
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
                {...register("dob", { required: "Date of Birth is required" })}
                placeholder='Enter Date of Birth'
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
                {...register("email", { required: "Email is required" })}
                placeholder='Enter Email'
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
                {...register("password", { required: "Password is required" })}
                placeholder='Enter Password'
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
                {...register("phone", { required: "Phone Number is required" })}
                placeholder='Enter Phone Number'
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Select
                label='Role'
                options={["Teacher", "Office Staff"]}
                {...register("Role", { required: "Role is required" })}
                className='w-96'
              />
              {errors.gender && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.gender.message}
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
