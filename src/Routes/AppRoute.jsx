import React from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom' 
import Register from '../Pages/Register/Register'
import Login from '../Pages/Login/Login'
import MainPage from '../Pages/LandingPage/MainPage'
import LandingPage from '../Pages/LandingPage/MainPage'

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* private Routes */}
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoute