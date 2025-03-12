import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username,
            password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
            const { token, role } = response.data;

            // Save token to local storage
            localStorage.setItem('authToken', token);

            // Redirect based on role
            if (role === 'student') {
                window.location.href = '/student';
            } else if (role === 'teacher') {
                window.location.href = '/teacher';
            } else if (role === 'admin') {
                window.location.href = '/admin';
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
