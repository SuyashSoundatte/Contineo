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
    <div className='flex justify-center items-center h-full w-full'>
      <div className='w-[80%] h-full  absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-2xl font-bold mb-6'>Student Information Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-16'>
          <div className='flex justify-between items-center gap-2'>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='First Name'
                type='text'
                name='fname'
                placeholder='First Name'
                {...register("fname", { required: "First Name is required" })}
              />
              {errors.fname && (
                <p className='text-red-500 text-sm'>
                  {errors.fname.message}
                </p>
              )}
            </div>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='Middle Name'
                type='text'
                name='mname'
                placeholder='Middle Name'
                {...register("mname", { required: "Middle Name is required" })}
              />
              {errors.mname && (
                <p className='text-red-500 text-sm'>
                  {errors.mname.message}
                </p>
              )}
            </div>
            <div className='flex flex-col w-[calc(100%/3)]'>
              <Input
                label='Last Name'
                type='text'
                name='lname'
                placeholder='Last Name'
                {...register("lname", { required: "Last Name is required" })}
              />
              {errors.lname && (
                <p className='text-red-500 text-sm'>
                  {errors.lname.message}
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
                name='DOB'
                placeholder='Enter Date of Birth'
                {...register("DOB", { required: "Date of Birth is required" })}
              />
              {errors.DOB && (
                <p className='text-red-500 text-sm'>{errors.DOB.message}</p>
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
                label='Roll Number'
                type='text'
                name='rollnumber'
                placeholder='Enter Roll Number'
                {...register("rollnumber", { required: "Roll Number is required" })}
              />
              {errors.rollnumber && (
                <p className='text-red-500 text-sm'>
                  {errors.rollnumber.message}
                </p>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center gap-2'>
            <div className="flex flex-col w-[calc(100%/2)]">
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
            <div className="flex flex-col w-[calc(100%/2)]">  
              <Select
                label='Role'
                options={["Student"]}
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

export default StudentCreate;
