import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    company: '',
    phone: '',
    email: '',
    pass: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!form.lastname.trim()) {
      errors.lastname = 'Last Name is required';
    }

    if (!form.company.trim()) {
      errors.company = 'Company Name is required';
    }

    const phonePattern = /^[0-9\b]+$/;
    if (!form.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!phonePattern.test(form.phone)) {
      errors.phone = 'Phone Number must be numeric';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(form.email)) {
      errors.email = 'Email is invalid';
    }

    if (!form.pass.trim()) {
      errors.pass = 'Password is required';
    } else if (form.pass.length < 6) {
      errors.pass = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit the form or perform other actions
      console.log('Form submitted successfully:', form);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 bg-purple w-[100vw] h-[100vh]"></div>
      <div className="form-container m-20 bg-black rounded-lg drop-shadow-lg relative z-10">
        <div className="split p-20">
          <p className='text-4xl text-white'>Register</p>
          <form onSubmit={handleSubmit} className='flex flex-row'>

            {/* Left form */}
            <div className="form-left w-[50%]">
              <div className="form-item-cont flex flex-col my-10">
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  className='p-2 w-[80%] rounded' 
                  placeholder='Name'
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
              </div>
              <div className="form-item-cont flex flex-col my-10">
                <input 
                  type="text" 
                  name="lastname" 
                  id="lastname" 
                  className='p-2 w-[80%] rounded' 
                  placeholder='Last Name'
                  value={form.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <span className="text-red-500">{errors.lastname}</span>}
              </div>
              <div className="form-item-cont flex flex-col my-10">
                <input 
                  type="text" 
                  name="company" 
                  id="company" 
                  className='p-2 w-[80%] rounded' 
                  placeholder='Company Name'
                  value={form.company}
                  onChange={handleChange}
                />
                {errors.company && <span className="text-red-500">{errors.company}</span>}
              </div>
              <div className="form-item-cont flex flex-col my-10">
                <input 
                  type="text" 
                  name="phone" 
                  id="phone" 
                  className='p-2 w-[80%] rounded' 
                  placeholder='Phone Number'
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="text-red-500">{errors.phone}</span>}
              </div>
            </div>

            {/* Right form */}
            <div className="form-right w-[50%] flex flex-col">
              <div className="form-item-cont flex flex-col my-10 flex-wrap">
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className='p-2 w-[80%] rounded' 
                  placeholder='Email'
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className="form-item-cont flex flex-col flex-wrap">
                <input 
                  type="password" 
                  name="pass" 
                  id="pass" 
                  className='p-2 w-[80%] rounded' 
                  placeholder='Password'
                  value={form.pass}
                  onChange={handleChange}
                />
                {errors.pass && <span className="text-red-500">{errors.pass}</span>}
              </div>
              <div className="form-item-cont flex flex-col flex-wrap w-[80%] my-4">
                <button type="submit" className="bg-btn-color text-white p-2 rounded mt-5">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
