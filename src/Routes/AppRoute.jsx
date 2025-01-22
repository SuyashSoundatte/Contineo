import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, Login, MainPage } from "../Pages/page.js";
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
        <Route path="/" element={ <Login /> } />  
        <Route path="/login" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />}>
          <Route path="UserForm" element={<UserCreate />} /> 
          <Route path="TeacherForm" element={<TeacherForm />} /> 
          <Route path="TeacherMasterForm" element={<TeacherMasterForm />} /> 
          <Route path="StudentMasterForm" element={<StudentMasterForm />}  />
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
    </BrowserRouter>
  );
};

export default AppRoute;
