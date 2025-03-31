import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      setUsername(studentId);
    }
  }, []);

  const showsignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      const { token, role } = response.data;

      // Save token to local storage
      localStorage.setItem("token", token);
      localStorage.removeItem("studentId");
      setUsername(" ");

      // Redirect based on role
      if (role === "student") navigate("/studentDashboard");
      else if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "admin") navigate("/admin");
    } catch (err) {
      setError(
        `Login failed. ${
          err.response?.data?.message || "Invalid username or password."
        }`
      );
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="text-gray-700"
        >
          Login
        </Typography>
        {error && (
          <Typography className="text-red-600 mb-4">{error}</Typography>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <Box className="mb-4">
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box className="mb-4">
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <div className="space-y-4">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Login
            </Button>

            <Button
              onClick={showsignup}
              type="button"
              fullWidth
              variant="contained"
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
