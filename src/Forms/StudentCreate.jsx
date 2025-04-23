// StudentCreate.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, ButtonComponent } from "../components/component.js";
import DocumentUploadForm from "../components/DocumentUploadForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createStudent } from "../services/api.js";

const StudentCreate = () => {
  const [createdUserId, setCreatedUserId] = useState(null);
  const [resetDocumentForm, setResetDocumentForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const resetAllForms = () => {
    // Reset the student information form
    reset({
      fname: "",
      mname: "",
      lname: "",
      email: "",
      phone: "",
      roll_no: "",
      dob: "",
      gender: "Gender",
      class_std: "Standard",
      address: "",
      // side: ""
    });
    
    // Reset the document upload form
    setResetDocumentForm(true);
    setTimeout(() => setResetDocumentForm(false), 0);
    
    // Reset the createdUserId to hide the document upload form
    setCreatedUserId(null);

    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data) => {
    try {
      const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
      };

      const formattedData = {
        ...data,
        dob: formatDate(data.dob),
      };

      const response = await createStudent(formattedData);
      // console.log(response)
      toast.success("Student created successfully!");
      setCreatedUserId(response.id);
      
      // Scroll to document upload section
      const documentSection = document.querySelector('#document-upload-section');
      if (documentSection) {
        documentSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create student. Please try again.");
    }
  };

  const handleDocumentUploadSuccess = () => {
    toast.success("All documents uploaded successfully! Creating new entry.");
    resetAllForms();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Student Create Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Input
                label="First Name"
                type="text"
                name="fname"
                placeholder="First"
                {...register("fname", { required: "First name is required" })}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Middle Name"
                type="text"
                name="mname"
                placeholder="Middle"
                {...register("mname")}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Last Name"
                type="text"
                name="lname"
                placeholder="Last"
                {...register("lname", { required: "Last name is required" })}
                className="w-full px-4 py-2 text-base"
              />
            </div>
            {(errors.fname || errors.lname) && (
              <p className="text-red-500 text-sm mt-1">
                First and Last name are required
              </p>
            )}

            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                placeholder="Phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-4 py-2 text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}

            <div className="grid grid-cols-2 gap-6">
              <Input
                label="PRN Number"
                type="text"
                name="roll_no"
                placeholder="Enter PRN Number"
                {...register("roll_no", {
                  required: "PRN number is required",
                })}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Date of Birth"
                type="date"
                name="dob"
                {...register("dob", { required: "Date of Birth is required" })}
                className="w-full px-4 py-2 text-base"
              />
            </div>
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}

            <div className="grid grid-cols-2 gap-6">
              <Select
                label="Gender"
                options={["Gender", "Male", "Female", "Other"]}
                {...register("gender", { required: "Gender is required" })}
                className="w-full px-4 py-2 text-base"
              />
              <Select
                label="Standard"
                options={["Standard", "11", "12"]}
                {...register("class_std", {
                  required: "Standard is required",
                })}
                className="w-full px-4 py-2 text-base"
              />
            </div>
            {(errors.gender || errors.class_std) && (
              <p className="text-red-500 text-sm mt-1">
                Gender and Standard are required
              </p>
            )}
            {/* <Select
            label= "Side"
            options = {
              [
                "Select Side",
                "Physics, Chemistry, Biology",
                "Physics, Chemistry, Biology, Mathematics",
                "physics,chemistry, Mathematics"
              ]
            }
            >

            </Select> */}

            <Input
              label="Address"
              type="text"
              name="address"
              placeholder="Enter Address"
              {...register("address", { required: "Address is required" })}
              className="w-full px-4 py-2 text-base"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}

            <div className="flex justify-end mt-8">
              <ButtonComponent
                type="submit"
                className="w-full sm:w-auto px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
              >
                Create Student
              </ButtonComponent>
            </div>
          </form>
        </div>

        <div id="document-upload-section" className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Document Upload
          </h2>
          {createdUserId ? (
            <DocumentUploadForm
              userId={createdUserId}
              onUploadSuccess={handleDocumentUploadSuccess}
              resetForm={resetDocumentForm}
            />
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
                Create a student to enable document uploads.
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentCreate;