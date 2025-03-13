import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Registration = () => {
  const [show,setShow]=useState(false)
  const showlogin=()=>{
    setShow(!show);
  }
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [department, setDepartment] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('department', department);
    formData.append('certificate', certificate);

    try {
      const response = await fetch('http://localhost:5000/auth/register-student', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.status === 201) {
        if (role === 'student') {
          alert('Registration successful! Use this username to login: ' + data.studentId);
        } else {
          alert('Registration successful!');
        }
        navigate('/student');
      } else if (response.status === 400) {
        alert(data.message); // Duplicate user error
      } else {
        alert('Registration failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
    <div className=" flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg relative border-2 border-transparent">
        <div className="absolute inset-0 border-4 border-indigo-500 rounded-lg animate-pulse"></div>
        <form onSubmit={handleSubmit} className="relative space-y-6 z-10">
          <h2 className="text-2xl font-bold text-center">Signup</h2>
          {message && <p className="text-red-500 text-center">{message}</p>}
          
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {role === 'student' && (
            <>
              <div>
                <label className="block text-gray-700">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700">Certificate</label>
                <input
                  type="file"
                  onChange={(e) => setCertificate(e.target.files[0])}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
          >
            Signup
          </button>
        </form>
        <button
          type="submit"
          className="w-1/2 mt-4 ml-10 bg-indigo-300 text-white p-2 rounded-lg hover:bg-indigo-60"
        onClick={showlogin}>
          Login
        </button>

      </div>
    </div>
    <Login />
    {show && (
      <h1>hello</h1>
    )}
    </>
  );
};

export default Registration;
