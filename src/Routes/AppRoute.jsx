import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("../Pages/LandingPage/LandingPage.jsx"));
const Login = lazy(() => import("../Pages/Login/Login.jsx"));
const MainPage = lazy(() => import("../Pages/MainPage/MainPage.jsx"));
const Parent = lazy(() => import("../Pages/MainPage/Parent.jsx"));
const StudentMarks = lazy(() => import("../components/StudentMarks.jsx"));

const AddFiles = lazy(() => import("../components/AddFiles.jsx"));
const AddSubjects = lazy(() => import("../components/AddSubjects.jsx"));
const TeacherAllocate = lazy(() => import("../components/TeacherAllocate.jsx"));
const ClassTeacherAllocate = lazy(() => import("../components/ClassTeacherAllocate.jsx"));
const Dashboard = lazy(() => import("../components/Dashboard.jsx"));
const MentorAllocate = lazy(() => import("../components/MentorAllocate.jsx"));
const StudentAllocate = lazy(() => import("../components/StudentAllocate.jsx"));
const StudentForm = lazy(() => import("../components/StudentForm.jsx"));
const StudentMasterForm = lazy(() => import("../components/StudentMasterForm.jsx"));
const SubjectForm = lazy(() => import("../components/SubjectForm.jsx"));
const TeacherForm = lazy(() => import("../components/TeacherForm.jsx"));
const TeacherMasterForm = lazy(() => import("../components/TeacherMasterForm.jsx"));
const ViewComponent = lazy(() => import("../components/ViewComponent.jsx"));
const AttendanceForm = lazy(() => import("../components/AttendaceForm.jsx"));
const UserCreate = lazy(() => import("../Forms/UserCreate.jsx"));
const StudentCreate = lazy(() => import("../Forms/StudentCreate.jsx"));

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* public Routes */}
          <Route path="/" element={<Login />} />  
          <Route path="/login" element={<Login />} />

          {/* private Routes parent */}
          <Route path="/parent" element={<Parent />}>
            <Route path="StudentMarks" element={<StudentMarks />} />
          </Route>

          {/* private Routes */}
          <Route path="/MainPage" element={<MainPage />}>
            <Route path="UserForm" element={<UserCreate />} />
            <Route path="TeacherForm" element={<TeacherForm />} />
            <Route path="TeacherMasterForm" element={<TeacherMasterForm />} />
            <Route path="StudentMasterForm" element={<StudentMasterForm />} />
            <Route path="SubjectForm" element={<SubjectForm />} />
            <Route path="StudentCreate" element={<StudentCreate />} />
            <Route path="TeacherAllocate" element={<TeacherAllocate />} />
            <Route path="StudentAllocate" element={<StudentAllocate />} />
            <Route path="MentorAllocate" element={<MentorAllocate />} />
            <Route path="ClassTeacherForm" element={<ClassTeacherAllocate />} />
            <Route path="StudentForm/:user_id" element={<StudentForm />} />
            <Route path="AddFiles" element={<AddFiles />} />
            <Route path="AttendanceForm" element={<AttendanceForm />} />
            <Route path="ViewComponent/:user_id" element={<ViewComponent />} />
            <Route path="TeacherMasterForm/:user_id" element={<TeacherMasterForm />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoute;
