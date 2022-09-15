import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

const Rootpage = () => {
  return (
    <div>
    <h1>Main Page</h1>
    <Nav/>
    <Outlet />
  </div>
  )
}

export default Rootpage
