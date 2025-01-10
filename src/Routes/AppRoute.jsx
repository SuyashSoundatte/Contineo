import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { LandingPage, Login, MainPage } from '../Pages/page.js'
import { TeacherForm, ClassTeacherForm, TeacherAllotment, MentorAllotment } from '../Forms/Forms.js'
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* private Routes */}
        <Route path="/MainPage" element={<MainPage />}>
          {/* Nested Routes */}
          <Route path="TeacherForm" element={<TeacherForm />} />
          <Route path="ClassTeacherForm" element={<ClassTeacherForm />} />
          <Route path="TeacherAllotment" element={<TeacherAllotment />} />
          <Route path="MentorAllotment" element={<MentorAllotment />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute
