import React from 'react'

const Login = () => {
  return (
    <div className="grid">
     <nav className="flex justify-between h-[80px] w-[100%] border-[2px] border-black mt-0">
     <div className="left text-5xl mt-2">
                  Salesalizer
            </div>

            <div className="right flex flex-col">
                  <ul className='flex mx-5 my-5 p-2'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                  </ul>
            </div>
     </nav>
     <div className="img border-2 border-black  w-[50%]">
      
     </div>
    <div className=' w-[500px] h-[90vh] flex  flex-col justify-center items-center border-black border-2 ml-[66%]'>
      <div className="head">
        <h1 className='text-lg font-bold'>Login</h1>
      </div>
      <div className="input p-1 justify-center items-center flex font-bold">
       Email
        <input type="text" className="rounded-xl border-2 border-slate-950"/>
      </div>
      <div className="input p-1   font-bold ">
        Password
        <input type="text" className="rounded-xl border-2 border-slate-950 "/>
      </div>
      <div className="input ">
        <button className='bg-black text-white p-2 font-bold'>Submit</button>
      </div>
    </div>
    </div>
  )
}

export default Login
   

