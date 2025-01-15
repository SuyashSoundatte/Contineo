import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, Login, MainPage } from "../Pages/page.js";
import {
  AddFiles,
  ButtonComponent,
  Dashboard,
  Input,
  MentorAllocate,
  ReactTable,
  Select,
  StudentAllocate,
  SubjectAllocate,  
  Table
} from "../components/component.js";

import {
  AllocateTeacher,
  ClassTeacherForm,
  MentorAllotment,
  StudentCreate,
  SubjectForm,
  TeacherAllocate,
  TeacherForm,
  TeacherMasterForm,
  UserCreate
} from "../Forms/Forms.js";

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
          <Route path="TeacherAllocate" element={<TeacherAllocate />} /> {/* Static route */}
          <Route path="StudentAllocate" element={<StudentAllocate />} /> {/* Static route */}
          <Route path="MentorAllocate" element={<MentorAllocate />} /> {/* Static route */}
          <Route path="SubjectAllocate" element={<SubjectAllocate />} /> {/* Static route */}
          <Route path="TeacherMasterForm/:user_id" element={<TeacherMasterForm />} /> {/* Dynamic route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
