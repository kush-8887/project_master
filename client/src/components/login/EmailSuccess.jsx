import React from 'react'
import { useLocation } from "react-router-dom";
import Reset from '../../assets/imgs/login/reset-password.png'
import Cross from '../../assets/imgs/login/remove.png'


export default function Success() {
    const location = useLocation();
    const { statusCode } = location.state || {}; 
    
  return (
    <div>
       {statusCode === 201 ? 
            <div className=" bg-b-grey h-[100vh] flex flex-col items-center justify-center"> 
                <img src={Reset} alt="" className='h-[200px]'/>
                <h1 className='text-white text-2xl mt-7'>An email with verification link shared!</h1>
                <a href="/login"className='text-white text-md mt-3 font-bold transition-colors hover:text-selected-purple'>Click here to login.</a>
            </div>
       : 
       <div className=" bg-b-grey h-[100vh] flex flex-col items-center justify-center"> 
            <img src={Cross} alt="" className='h-[200px]'/>
            <h1 className='text-white text-2xl mt-7'>Looks like you have entered an invalid email.</h1>
            <a href="/register"className='text-white text-md mt-3 font-bold transition-colors hover:text-selected-purple'>Click here to signup again.</a>
       </div>
       
       }
    </div>
  )
}
