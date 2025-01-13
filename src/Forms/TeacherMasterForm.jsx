import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "../components/Select"; // Make sure the Select component is properly imported
import ButtonComponent from "../components/ButtonComponent"; // ButtonComponent for Submit
import AddFiles from "../components/AddFiles"; // AddFiles for file upload
import Input from "../components/Input";

const TeacherMasterForm = () => {
  const { userId } = useParams(); // Access the userId parameter from the URL
  const [userData, setUserData] = useState(null); // Store fetched user data

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Simulate fetching user data based on userId
  useEffect(() => {
    // Replace this with an actual API call to get the user data
    const user = {
      id: userId,
      fname: "John",
      mname: "Doe",
      lname: "Smith",
      role: "Admin",
      standard: "Standard 10",
      subject: "Physics",
    };
    setUserData(user);

    // Pre-fill form fields with the fetched user data
    setValue("userId", user.id);
    setValue("fname", user.fname);
    setValue("mname", user.mname);
    setValue("lname", user.lname);
    setValue("role", user.role);
    setValue("standard", user.standard);
    setValue("subject", user.subject);
  }, [userId, setValue]);

  // File change handler
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
  };

  // Form submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  if (!userData) {
    return <div>Loading...</div>; // Show loading while user data is fetched
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='w-[70%]'>
        <h1 className='text-2xl font-bold mb-6'>User Information Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex justify-between items-center gap-2'>
            <div className='flex gap-4  w-[calc(100%/2)]'>
              <div className='flex flex-col w-[calc(100%/2)]'>
                <label>ID</label>
                <input
                  type='text'
                  value={userData.id}
                  readOnly
                  {...register("userId")}
                />
              </div>
              <div className='flex flex-col w-[calc(100%/2)]'>
                <label>First Name</label>
                <input
                  type='text'
                  defaultValue={userData.fname}
                  {...register("fname", { required: "First Name is required" })}
                />
              </div>
              <div className='flex flex-col w-[calc(100%/2)]'>
                <label>Last Name</label>
                <input
                  type='text'
                  defaultValue={userData.lname}
                  {...register("lname", { required: "First Name is required" })}
                />
              </div>
            </div>
          </div>
          {/* <div className='flex justify-between items-center gap-2'>
            <div className='flex flex-col w-[calc(100%/2)]'>
              <Input 
                label='Subject'
                type='text'
                placeholder='Enter Subject'
                {...register("subject", { required: "Subject is required" })}
                required
              />
              {errors.subject && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.subject.message}
                </p>
              )} 
            </div>
            <div className='flex flex-col w-[calc(100%/2)]'>
              <Input 
                label='Standard'
                type='text'
                placeholder='Enter Standard'
                {...register("standard", { required: "Standard is required" })}
                required
              />
              {errors.standard && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.standard.message}
                </p>
              )}

            </div>
          </div> */}
          {/* <ButtonComponent type='button'>Add Files</ButtonComponent> */}
          <h1>Add Documents</h1>
          <AddFiles />
          <div>
            <ButtonComponent type='submit'>Submit</ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherMasterForm;
