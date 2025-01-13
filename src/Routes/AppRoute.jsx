import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, Login, MainPage } from '../Pages/page.js';
import { UserCreate, TeacherForm, ClassTeacherForm, TeacherAllotment, MentorAllotment, OfficeLanding } from '../Forms/Forms.js';
import { TeacherMasterForm } from '../Forms/Forms.js';
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route path="/MainPage" element={<MainPage />}>
          {/* Nested Routes */}
          <Route path="UserForm" element={<UserCreate />} />
          <Route path="TeacherForm" element={<TeacherForm />} />
          <Route path="TeacherMaster" element={<TeacherMasterForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
