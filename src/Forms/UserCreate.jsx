import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Input,
  Select,
  ButtonComponent,
  AddSubjects,
} from "../components/component.js";
import DocumentUploadForm from "../components/DocumentUploadForm";
import { createUser } from "../services/api.js";

const UserCreate = () => {
  const [createdUserId, setCreatedUserId] = useState(null);
  const [addedSubjects, setAddedSubjects] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [resetDocumentForm, setResetDocumentForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const resetAllForms = () => {
    // Reset the main form
    reset({
      fname: "",
      mname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      dob: "",
      gender: "",
      role: "Role",
      address: ""
    });
    
    // Reset other states
    setSelectedRole("");
    setAddedSubjects([]);
    
    // Reset the document upload form
    setResetDocumentForm(true);
    setTimeout(() => setResetDocumentForm(false), 0);
    
    // Reset the createdUserId to hide the document upload form
    setCreatedUserId(null);

    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubjectsUpdate = (subjects) => {
    setAddedSubjects(subjects);
  };

  const handleDocumentUploadSuccess = () => {
    toast.success("All documents uploaded successfully! Creating new entry.");
    resetAllForms();
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
        subjects: addedSubjects.filter(sub => sub.name).map((sub) => sub.name),
      };

      const response = await createUser(formattedData);
      

      toast.success("User created successfully!");
      setCreatedUserId(response.data.data.id);
      
      // Scroll to document upload section
      const documentSection = document.querySelector('#document-upload-section');
      if (documentSection) {
        documentSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      toast.error("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Staff Information Form
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
                {...register("mname")}
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
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                placeholder="Phone"
                {...register("phone", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
              <Input
                label="Date of Birth"
                type="date"
                name="dob"
                {...register("dob", { required: "Required" })}
                className="w-full px-4 py-2 text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Select
                label="Gender"
                options={["Gender", "Male", "Female", "Other"]}
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
                  "ClassTeacherIncharge",
                  "MentorIncharge",
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

            <Input
              label="Address"
              type="text"
              name="address"
              placeholder="Enter Address"
              {...register("address", { required: "Required" })}
              className="w-full px-4 py-2 text-base"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}

            {selectedRole === "Teacher" && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  Add Subject
                </h2>
                <AddSubjects onSubjectsUpdate={handleSubjectsUpdate} />
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
                Create a user to enable document uploads.
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserCreate;