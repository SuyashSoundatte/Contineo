import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, Login, MainPage } from "../Pages/page.js";
import { TeacherMasterForm, UserCreate, TeacherForm, SubjectForm, StudentCreate, AllocateTeacher } from "../Forms/Forms.js";git 

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={ <Login /> } />  
        <Route path="/login" element={<Login />} />

        {/* private Routes */}
        <Route path="/MainPage" element={<MainPage />}>
          {/* Nested Routes */}
          <Route path="UserForm" element={<UserCreate />} /> {/* Static route */}
          <Route path="TeacherForm" element={<TeacherForm />} /> {/* Static route */}
          <Route path="TeacherMasterForm" element={<TeacherMasterForm />} /> {/* Static route */}
          <Route path="SubjectForm" element={<SubjectForm />} /> {/* Static route */}
          <Route path="StudentCreate" element={<StudentCreate />} /> {/* Static route */}
          <Route path="AllocateTeacher" element={<AllocateTeacher />} /> {/* Static route */}
          <Route path="TeacherMasterForm/:userId" element={<TeacherMasterForm />} /> {/* Dynamic route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
