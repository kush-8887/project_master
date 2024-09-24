import React from 'react'
import logo from '../../assets/svg/logo/full-logo.svg'

export default function DashNav() {
  return (
    <nav className='bg-b-grey w-[20vw] h-[100vh] flex flex-col'>
        <div className="w-[100%] flex justify-center">
            <img src={logo} alt="" srcset="" className='p-4 w-[200px]' />
        </div>
        <div className='px-5'>
            <div className="current-analytics">
                {/* heading  */}
                <div className="text-white text-2xl">
                    Current Analytics
                </div>
                <div className="option-holder flex flex-col">
                    <div className="nav-option">
                        <div className=" my-3 item py-3 px-2 text-white bg-b-grey rounded-md hover:bg-selected-purple hover:text-black cursor-pointer">
                            Monthly Total
                        </div>
                        <div className=" my-3 item py-3 px-2 text-white bg-b-grey rounded-md hover:bg-selected-purple hover:text-black cursor-pointer">
                            Monthly Total
                        </div>
                        <div className=" my-3 item py-3 px-2 text-white bg-b-grey rounded-md hover:bg-selected-purple hover:text-black cursor-pointer">
                            Monthly Total
                        </div>
                    </div>
                </div>
            </div>
            <div className="prediction-analytics">
            <div className="text-white text-2xl">
                    Prediction Analytics
                </div>
            </div>
        </div>
    </nav>
  )
}
