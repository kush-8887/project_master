import React, { useState } from 'react';
import picture from '../assets/imgs/login/login.png';
import hidden from '../assets/svg/utils/eye-password-hide-svgrepo-com.svg';
import show from '../assets/svg/utils/eye-password-show-svgrepo-com.svg';

//Navbar
import Navbar from './utils/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordState, setPasswordState] = useState('password');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      // Proceed with form submission
      console.log('Form submitted:', { email, password });
    }
  };

  const changeView = (e) => {
    const id = e.target.id;
    console.log(id);

    if (passwordState === 'password') {
      setPasswordState('text');
    } else {
      setPasswordState('password');
    }
  };

  return (
    <div className="bg-navy min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-between items-center mx-[7.25rem] my-[4.5rem]">
        <div className="w-[70%] flex justify-center">
          <img src={picture} alt="Description" className="max-w-full h-auto" />
        </div>

        <div className="w-[30%] flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-lg font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded-xl border-2 border-slate-950"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>

            <div className="w-full mb-6">
              <label htmlFor="password" className="block text-lg font-bold mb-2">
                Password
              </label>
              <div className="icons absolute">
                <img
                  src={hidden}
                  onClick={changeView}
                  id="hidden"
                  alt=""
                  className={`relative h-7 top-[8px] left-[270px] cursor-pointer ${passwordState === 'text' ? 'hidden' : 'block'}`}
                />
                <img
                  src={show}
                  onClick={changeView}
                  id="show"
                  alt=""
                  className={`relative h-7 top-[8px] left-[270px] cursor-pointer ${passwordState === 'text' ? 'block' : 'hidden'}`}
                />
              </div>
              <input
                type={passwordState}
                id="password"
                className="w-full p-2 rounded-xl border-2 border-slate-950"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg font-bold">
              Submit
            </button>
            <br /> <br />
            <a href="/register" className='my-5 font-bold'>New customer? Register</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
