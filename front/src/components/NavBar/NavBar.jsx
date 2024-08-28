import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import NavBarLinks from './NavBarLinks'
const NavBar = () => {
  return (
    <div className=' bg-slate-800 border-b-2 border-white w-screen h-[5svh] text-white flex items-center '>
      <nav className=' container mx-auto justify-between flex  gap-2'>
        <div className='flex gap-2'>
        <NavLink to='/'>home</NavLink>
        <NavLink to='/music'>music</NavLink>
        </div>
        <NavBarLinks/>
      </nav>
    </div>
  )
}

export default NavBar