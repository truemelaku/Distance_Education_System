<<<<<<< HEAD
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const showsignup = () => {
    navigate('/signup');
  };

  // Only pre-fill username if studentId exists in localStorage and the role is 'student'
  useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    //const userRole = localStorage.getItem('role');
    
    // Pre-fill the username for students, but not for other roles
    if (storedStudentId) {
      setUsername(storedStudentId); // Pre-fill for students only
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      const { token, role } = response.data;

      console.log("Received Token:", token);
      console.log("Received Role:", role);

      // Save token and role to local storage after successful login
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Clear studentId from localStorage after login to ensure it's not pre-filled next time
      localStorage.removeItem('studentId');
      
      console.log("Token stored in localStorage:", localStorage.getItem('token'));

      // Clear the username field to ensure it's empty after login
      setUsername('');

      // Redirect based on role
      if (role === 'student') {
        navigate('/studentDashboard');
      } else if (role === 'teacher') {
        navigate('/teacher');
      } else if (role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      setError('Login failed. Invalid username or password.',error);
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom className="text-gray-700">
          Login
        </Typography>
        <Box className="absolute top-1/4 left-1/3 transform -translate-x-1/2 p-4 w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3">
  {/* Tailwind width for responsiveness */}
  <div  className="w-full p-4 rounded-lg text-red-800 text-2xl" >
    {error}
  </div>
</Box>
        <form onSubmit={handleSubmit} className="w-full">
          <Box className="mb-4">
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{ style: { color: '#333' } }}
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
              InputProps={{ style: { color: '#333' } }}
            />
          </Box>
          <div className="space-y-4">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Login
            </Button>

            <Button
              onClick={showsignup}
              type="button"
              fullWidth
              variant="contained"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
=======
import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const showsignup=()=>{
        navigate('/signup')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username,
            password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
        const { token, role } = response.data;
         
            console.log("Received Token:", token);
            console.log("Received Role:", role);
            // Save token to local storage
            localStorage.setItem('token', token);
           console.log("Token stored in localStorage:", localStorage.getItem('token'));


            // Redirect based on role
            if (role === 'student') {
                navigate('/student');
            } else if (role === 'teacher') {
                navigate('/teacher');
            } else if (role === 'admin') {
                navigate('/admin');
            }
        } catch (error) {
            setError('Login failed. Invalid username or password.', error);
        }
    };

    return (
        <Container maxWidth="xs" className="login-container">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom className="text-gray-700">
                    Login
                </Typography>
                {error && <Typography className="text-red-600 mb-4">{error}</Typography>}
                <form onSubmit={handleSubmit} className="w-full">
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            InputProps={{ style: { color: '#333' } }}
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
                            InputProps={{ style: { color: '#333' } }}
                        />
                    </Box>
                    <div className="space-y-4">
  <Button
    type="submit"
    fullWidth
    variant="contained"
    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
  >
    Login
  </Button>

  <Button
    onClick={showsignup}
    type="button"
    fullWidth
    variant="contained"
    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
  >
    Sign Up
  </Button>
</div>

     </form>
            </Box>
           
        </Container>
        
    );
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
};

export default Login;
