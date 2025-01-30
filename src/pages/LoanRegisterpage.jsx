import React from 'react'
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const LoanRegisterpage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cnic: '',
    email: '',
    name: '',
  });
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    const cnicRegex = /^[0-9]{13}$/; // CNIC must be 13 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.cnic || !cnicRegex.test(formData.cnic)) {
      newErrors.cnic = 'CNIC must be 13 digits.';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      localStorage.setItem('adminemail', "admin@gmail.com")
      localStorage.setItem('user', JSON.stringify(formData))
      navigate('/Login')
    }
  };

  return (
    <>
      <Header/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Loan Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* CNIC Field */}
          <label className="block mb-4">
            <span className="text-gray-700">CNIC</span>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              className={`w-full mt-2 p-2 border rounded-lg ${
                errors.cnic ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 13-digit CNIC"
            />
            {errors.cnic && <p className="text-red-500 text-sm">{errors.cnic}</p>}
          </label>

          {/* Email Field */}
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mt-2 p-2 border rounded-lg ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </label>

          {/* Name Field */}
          <label className="block mb-4">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full mt-2 p-2 border rounded-lg ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );

}

export default LoanRegisterpage