import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

export default function TeacherForm() {
  const [teacher, setTeacher] = useState({
    fullName: '',
    email: '',
    teacherId: '',
    gender: '',
    department: '',
    teachingSubject: '',
    salary: '',
    qualificationCertificate: '',
    role:'teacher',
    password: '',
  });

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the token from localStorage (or wherever you're storing it after login)
    const token = localStorage.getItem('token');
    
    try {
      await axios.post(
        'http://localhost:5000/api/teachers/register', 
        teacher, 
        {
          headers: {
            Authorization: `Bearer ${token}` // Attach the token in the request headers
          }
        }
      );
      alert('Teacher added successfully');
      setTeacher({
        fullName: '',
        email: '',
        teacherId: '',
        gender: '',
        department: '',
        teachingSubject: '',
        qualificationCertificate: '',
        role: 'teacher',
        password: ''
      });
    } catch (error) {
      alert('Error adding teacher: ' + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <Box className="p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="w-full">
        {/* Teacher form table */}
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="bg-gray-100">
              <td className="p-3 border border-gray-300 font-semibold">Full Name</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="fullName" 
                  value={teacher.fullName} 
                  onChange={handleChange} 
                  fullWidth 
                />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300 font-semibold">Email</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="email" 
                  value={teacher.email} 
                  onChange={handleChange} 
                  fullWidth 
                />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300 font-semibold">Teacher ID</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="teacherId" 
                  value={teacher.teacherId} 
                  onChange={handleChange} 
                  fullWidth 
                />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300 font-semibold">Gender</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="gender" 
                  value={teacher.gender} 
                  onChange={handleChange} 
                  fullWidth 
                />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300 font-semibold">Department</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="department" 
                  value={teacher.department} 
                  onChange={handleChange} 
                  fullWidth 
                />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300 font-semibold">Teaching Subject</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="teachingSubject" 
                  value={teacher.teachingSubject} 
                  onChange={handleChange} 
                  fullWidth 
                />
                <input type="hidden" name="role" value="teacher" />

              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300 font-semibold">Qualification Certificate</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="qualificationCertificate" 
                  value={teacher.qualificationCertificate} 
                  onChange={handleChange} 
                  fullWidth 
                />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300 font-semibold">Password</td>
              <td className="p-3 border border-gray-300">
                <TextField 
                  name="password" 
                  type="password"
                  value={teacher.password} 
                  onChange={handleChange} 
                  fullWidth 
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button type="submit" variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2">
            Add Teacher
          </Button>
        </div>
      </form>
    </Box>
  );
}
