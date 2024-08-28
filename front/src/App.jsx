import React from 'react'
import { Outlet,Link } from 'react-router-dom'
import NavBar from './components/NavBar'
const App = () => {
  return (
    <div className='h-screen'>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default App