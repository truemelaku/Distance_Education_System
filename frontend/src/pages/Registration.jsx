import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./reg.css";
import Login from "./Login";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    entranceExamCertificate: null,
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, entranceExamCertificate: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("fullname", formData.fullname);
    form.append("gender", formData.gender);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("confirmPassword", formData.confirmPassword);
    form.append("department", formData.department);
    form.append("entranceExamCertificate", formData.entranceExamCertificate);

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      navigate("/student"); // Redirect to the student page
      // If registration is successful, redirect to the student page
      // if (response.status === 200) {
      //   navigate("/student"); // Redirect to the student page
      // }
    } catch (error) {
      alert("Registration failed: " + error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Entrance Exam Certificate</label>
              <input
                type="file"
                name="entranceExamCertificate"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Login />
    </>
  );
};

export default Registration;
