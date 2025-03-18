import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, Login, MainPage, Parent } from "../Pages/page.js";
import StudentMarks from "../components/StudentMarks.jsx";
import  {
  AddFiles,
  AddSubjects,
  TeacherAllocate,
  ButtonComponent,
  CheckboxComponent,
  ClassTeacherAllocate,
  Dashboard,
  Input,
  MentorAllocate,
  Modal,
  ReactTable,
  Select,
  StudentAllocate,
  StudentForm,
  StudentMasterForm,
  SubjectForm,
  Table,
  TeacherForm,
  TeacherMasterForm,
  ViewComponent,
  AttendanceForm
} from '../components/component.js';

import {
  UserCreate,
  StudentCreate
} from '../Forms/Forms.js';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={ <Login /> } />  
        <Route path="/login" element={<Login />} />

        {/* private Routes parent */}
        <Route path="/parent" element={<Parent />}>
          <Route path="StudentMarks" element={<StudentMarks />} />
        </Route>
        {/* private Routes */}
        <Route path="/MainPage" element={<MainPage />}>
          {/* Nested Routes */}
          <Route path="UserForm" element={<UserCreate />} /> {/* Static route */}
          <Route path="TeacherForm" element={<TeacherForm />} /> {/* Static route */}
          <Route path="TeacherMasterForm" element={<TeacherMasterForm />} /> {/* Static route */}
          <Route path="StudentMasterForm" element={<StudentMasterForm />}  />
          <Route path="SubjectForm" element={<SubjectForm />} /> {/* Static route */}
          <Route path="StudentCreate" element={<StudentCreate />} /> {/* Static route */}
          <Route path="TeacherAllocate" element={<TeacherAllocate />} /> {/* Static route */}
          <Route path="StudentAllocate" element={<StudentAllocate />} /> {/* Static route */}
          <Route path="MentorAllocate" element={<MentorAllocate />} /> {/* Static route */}
          <Route path="ClassTeacherForm" element={<ClassTeacherAllocate />} /> {/* Static route */}
          <Route path="StudentForm/:user_id" element={<StudentForm />} /> {/* Static route */}
          <Route path="AddFiles" element={<AddFiles />} /> {/* Static route */}
          <Route path="AttendanceForm" element={<AttendanceForm />} /> {/* Static route */}
          <Route path="ViewComponent/:user_id" element={<ViewComponent />} />
          <Route path="TeacherMasterForm/:user_id" element={<TeacherMasterForm />} /> {/* Dynamic route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
