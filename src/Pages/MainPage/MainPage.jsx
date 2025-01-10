import React from 'react'
import Dashboard from '../../components/Dashboard'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <>
    <div>
      <div className="left">
        <Dashboard />
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default MainPage
