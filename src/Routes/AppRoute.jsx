import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { LandingPage, Login, MainPage } from '../Pages/page.js'
import TeacherForm from '../Forms/TeacherForm'
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
          <Route path="/MainPage/TeacherForm" element={<TeacherForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute
