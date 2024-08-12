import React from 'react'
import error from '../../assets/imgs/utils/error-page.png'


export default function Error() {
  return (
    <div>
      <div className="errorpage bg-b-grey h-[100vh] flex flex-col items-center justify-center">
        <img src={error} alt="" srcset="" className='w-[300px] h-[300px]' />
        <h1 className='uppercase text-white text-2xl'>the page you are looking for doesn't exist.</h1>
        <a href="/" className='p-2 rounded-md font-bold bg-slate-50 text-black my-5 border-2 hover:bg-selected-purple hover:text-black hover:transition-colors hover:border-selected-purple hover:border-2'>Go to home ?</a>
      </div>
    </div>
  )
}
