import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Reset() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!password || password === '') {
      setPasswordError('Password is required');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      try {
        const response = await fetch(`http://localhost:8000/reset/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        let statusCode = response.status;        
        navigate("/pass-success", { state: { statusCode :statusCode } });
    
      } catch (error) {
        console.error('Error verifing email:', error);
      }
    }
  };

  return (
    <div>
      <div className="errorpage bg-b-grey h-[100vh] flex flex-col items-center ">
        <div className="w-[40%] bg-c-grey my-[100px] p-10 rounded-xl">
          <div className="">
            <p className="text-white text-3xl">Update your password</p>
            <p className='text-white my-3'>
              Enter your new password below.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-[100%]">
            <div className="w-[100%] mb-4">
              <label
                htmlFor="password"
                className="block text-lg font-bold mb-2 text-white "
              >
                New Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="w-full p-2 rounded-m border-2 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-[100%] mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-bold mb-2 text-white "
              >
                Confirm Password
              </label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full p-2 rounded-m border-2 text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg font-bold transition-colors hover:bg-selected-purple hover:text-black"
            >
              Submit
            </button>
          </form> 
        </div>
      </div>
    </div>
  );
}
