import React, { useState } from 'react';
import Navbar from './utils/Navbar';

import picture from '../assets/imgs/login/login.png';
import hidden from '../assets/svg/utils/eye-password-hide-svgrepo-com.svg';
import show from '../assets/svg/utils/eye-password-show-svgrepo-com.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordState, setPasswordState] = useState('password');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    if (!companyName) {
      newErrors.companyName = 'Company name is required';
      valid = false;
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Invalid phone number format';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Proceed with form submission
      console.log('Form submitted:', { name, lastName, companyName, phone, email, password });
    }
  };

  const changeView = () => {
    setPasswordState(passwordState === 'password' ? 'text' : 'password');
  };

  return (
    <div className="bg-dark-navy min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-between items-center">
        <div className="w-[50%] flex justify-center">
          <img src={picture} alt="Description" className="max-w-full h-auto" />
        </div>

        <div className="w-[50%] flex flex-col items-center bg-white p-10 rounded-lg shadow-lg m-10">
          <h1 className="text-2xl font-bold mb-6">Register</h1>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full mb-4">
              <label htmlFor="name" className="block text-lg font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 rounded-xl border-2 border-slate-950"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="w-full mb-4">
              <label htmlFor="lastName" className="block text-lg font-bold mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="w-full p-2 rounded-xl border-2 border-slate-950"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>

            <div className="w-full mb-4">
              <label htmlFor="companyName" className="block text-lg font-bold mb-2">Company Name</label>
              <input
                type="text"
                id="companyName"
                className="w-full p-2 rounded-xl border-2 border-slate-950"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
            </div>

            <div className="w-full mb-4">
              <label htmlFor="phone" className="block text-lg font-bold mb-2">Phone Number</label>
              <input
                type="text"
                id="phone"
                className="w-full p-2 rounded-xl border-2 border-slate-950"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>

            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-lg font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded-xl border-2 border-slate-950"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="w-full mb-6">
              <label htmlFor="password" className="block text-lg font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  type={passwordState}
                  id="password"
                  className="w-full p-2 rounded-xl border-2 border-slate-950"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src={passwordState === 'password' ? hidden : show}
                  onClick={changeView}
                  alt="Toggle Password Visibility"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer h-[25px]"
                />
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            <div className="w-full mb-6">
              <label htmlFor="confirmPassword" className="block text-lg font-bold mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={passwordState}
                  id="confirmPassword"
                  className="w-full p-2 rounded-xl border-2 border-slate-950"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img
                  src={passwordState === 'password' ? hidden : show}
                  onClick={changeView}
                  alt="Toggle Password Visibility"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer h-[25px]"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg font-bold">
              Submit
            </button>
            <br /><br />
            <a className='hover:cursor-pointer font-bold' href='/login'> Already have an account? Login</a>
          </form>
        </div>
      </div>
    </div>
  );
}
