import React, { useState } from "react";
import "./reg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200 && response.data.success) {
        console.log('Navigating to student page'); // Debug log
        navigate('/student'); // Navigate to student page
      } 
    } catch (error) {
      alert("Login failed: " + (error.response?.data.message || error.message));
    }
  };
     <h1>login here</h1>
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
