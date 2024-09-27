import React from 'react'

export default function DashNav2({uploadHandler}) {
  return (
    <nav className='bg-b-grey w-[100%] h-[10vh] flex justify-between items-center'>
        <div className=" text-white profile-container ml-5">
            Profile
        </div>
        <div className="upload-csv-container mr-5">
            <button onClick={uploadHandler} className='p-2 rounded-md text-white bg-black hover:bg-selected-purple'>Upload CSV</button>
        </div>
    </nav>
  )
}
