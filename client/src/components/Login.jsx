import React from 'react'
import picture from './resources/image.png'

const Login = () => {
  return (
    <div className='bg-blue-950'>
     <nav className="flex justify-between h-[80px] w-[100%]  mt-0 bg-blue-900">
     <div className="left text-5xl mt-2 text-white">
                  Salesalizer
            </div>

            <div className="right flex flex-col">
                  <ul className='flex mx-5 my-5 text-white p-2'>
                    <li className='p-1'>Home</li>
                    <li  className='p-1'>About</li>
                    <li  className='p-1'>Services</li>
                  </ul>
            </div>
     </nav>
    <div className="bottom flex justify-between w-[100%] h-[100%]">

    <div className="left w-[120vh] h-[90vh] flex  flex-col  items-center ]">
            <img src={picture} className=' w-[100vh]'/>
    </div>


    <div className='right w-[70vh] h-[90vh] flex  flex-col  items-center  bg-white'>
      <div className="form mt-[30vh] flex  flex-col  items-center">

      <div className="head">
        <h1 className='text-lg  font-bold'>Login</h1>
      </div>

      <div className="input p-1 justify-center items-center flex font-bold">
       Email
        <input type="text" className="rounded-xl border-2 border-slate-950"/>
      </div>

      <div className="input p-1   font-bold  ml-[-40px] ">
        Password
        <input type="text" className="rounded-xl border-2 border-slate-950 "/>
      </div>

      <div className="input ">
        <button className='bg-black text-white p-2 font-bold'>Submit</button>
      </div>

      </div>
    </div>
    </div>
    </div>
  )
}

export default Login
   

