import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";
import { Button } from "@mui/material";
import ButtonComponent from "../components/ButtonComponent";
import CheckList from "../components/AddFiles";
import AddFiles from "../components/AddFiles";

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
    <div className='flex justify-center items-center'>
      <div className='w-[70%]'>
        <h1 className='text-2xl font-bold mb-6'>User Information Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex justify-between items-center gap-2'>
            <div className='flex flex-col w-[calc(100%/2)]'>
              <Select 
                label='Standard'
                options={["Standard 9", "Standard 10", "Standard 11", "Standard 12"]}
                {...register("standard", { required: "Standard is required" })}
              />
              {errors.standard && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.standard.message}
                </p>
              )}
            </div>
            <div className='flex flex-col w-[calc(100%/2)]'>
              <Select
                label='Subject'
                options={["Physics", "Chemistry", "Maths", "Biology"]} 
                {...register("subject", { required: "Subject is required" })}   
                />
              {errors.subject && (  
                <p className='text-red-500 text-sm mt-1'>
                  {errors.subject.message}
                </p>
              )}  
            </div>
          </div>
              {/* <ButtonComponent type='button'>Add Files</ButtonComponent> */}
              <AddFiles />
          <div>
            <ButtonComponent type='submit'>Submit</ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
