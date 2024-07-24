import React from 'react'

export default function Register() {
  return (
    <div>
        <div className="form-container m-20 h-[80vh] bg-orange-400">
            <div className="split">
            <p className='text-6l'>Register</p>
            <form action="" method="post">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" className='p-2 text-'/>
            </form>
            </div>
        </div>
    </div>
  )
}
