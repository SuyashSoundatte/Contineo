import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import LandingPage from '../Pages/LandingPage/LandingPage'
import Login from '../Pages/Login/Login'
import MainPage from '../Pages/MainPage/MainPage'

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* private Routes */}
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute
