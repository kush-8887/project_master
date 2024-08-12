import React from 'react'
import Logo from '../../assets/svg/logo/full-logo.svg'


export default function Navbar() {
  return (
    <div className='bg-b-grey py-5 px-8 flex items-center justify-between'>
      <div className="logo-container">
        <img src={Logo} alt="logo" className='h-12' />
      </div>
      <div className="links-conatiner">
        <a href="/" className='text-white px-5 py-2 rounded-2xl border-1 font-semibold transition-colors hover:bg-white hover:text-black'>Home</a>
        <a href="/about" className='text-white px-5 py-2 rounded-2xl border-1 font-semibold transition-colors hover:bg-white hover:text-black'>About Us</a>
        <a href="/login" className='text-white px-5 py-2 rounded-2xl border-1 font-semibold transition-colors hover:bg-white hover:text-black'>Login</a>
        <a href="/register" className='text-white px-5 py-2 rounded-2xl border-1 font-semibold transition-colors hover:bg-white hover:text-black'>Register</a>
      </div>
    </div>
  )
}
