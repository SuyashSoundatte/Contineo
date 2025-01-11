import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";

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
          <div className='flex justify-between items-center gap-8'>
            <Input
              label='First Name'
              type='text'
              name='firstName'
              placeholder='First Name'
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <p className='text-red-500 text-sm'>{errors.firstName.message}</p>
            )}
            <Input
              label='Middle Name'
              type='text'
              name='middleName'
              {...register("middleName")}
              placeholder='Middle Name'
            />
            {errors.middleName && (
              <p className='text-red-500 text-sm'>
                {errors.middleName.message}
              </p>
            )}
            <Input
              label='Last Name'
              type='text'
              name='lastName'
              {...register("lastName", { required: "Last Name is required" })}
              placeholder='Last Name'
            />
            {errors.lastName && (
              <p className='text-red-500 text-sm'>{errors.lastName.message}</p>
            )}
            {errors.lastName && (
              <p className='text-red-500 text-sm'>{errors.lastName.message}</p>
            )}
          </div>
          <div className='flex justify-between items-center gap-8'>
            <div>
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
            <div>
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
            <div>
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
          <div className='flex justify-between items-center gap-2'>
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
            <div>
              <Select
                label='Gender'
                options={["Gender","Male", "Female"]}
                {...register("gender", { required: "Gender is required" })}
              />
              {errors.gender && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* <div className='col-span-3 text-right'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-6 py-2 rounded'
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
