import { useState, useEffect } from 'react';
import { TextField, Button, Box, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Typography, Paper } from '@mui/material';
import axios from 'axios';

export default function TeacherPage() {
  const [teacher, setTeacher] = useState({
    fullName: '',
    email: '',
    teacherId: '',
    gender: '',
    department: '',
    teachingSubject: '',
    salary: '',
    qualificationCertificate: '',
    role: 'teacher',
    password: '',
  });

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Admin is not logged in');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/teachers/register', teacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        password: '',
      });
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      alert('Error adding teacher: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      alert('Teacher deleted successfully');
    } catch (error) {
      alert('Error deleting teacher');
      console.error(error);
    }
  };

  return (
    <Box className="max-w-6xl mx-auto p-6">
      <Typography variant="h4" className="text-center mb-6 text-gray-700 font-bold">Teacher List</Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setShowForm(!showForm)} 
        className="mb-4">
        {showForm ? 'Hide Form' : 'Add Teacher'}
      </Button>

      {showForm && (
        <Box className="p-6 bg-white shadow-md rounded-lg mb-6">
          <form onSubmit={handleSubmit} className="w-full">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Full Name</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="fullName" value={teacher.fullName} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Email</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="email" value={teacher.email} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Teacher ID</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="teacherId" value={teacher.teacherId} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Gender</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="gender" value={teacher.gender} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Department</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="department" value={teacher.department} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Teaching Subject</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="teachingSubject" value={teacher.teachingSubject} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Qualification Certificate</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="qualificationCertificate" value={teacher.qualificationCertificate} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Password</td>
                  <td className="p-3 border border-gray-300">
                    <TextField name="password" type="password" value={teacher.password} onChange={handleChange} fullWidth required />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-center mt-6">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      )}

      {loading ? (
        <Box className="flex justify-center items-center h-48">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} className="overflow-auto">
          <Table className="min-w-full">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="p-3 text-lg font-semibold">Full Name</TableCell>
                <TableCell className="p-3 text-lg font-semibold">Email</TableCell>
                <TableCell className="p-3 text-lg font-semibold">Teacher ID</TableCell>
                <TableCell className="p-3 text-lg font-semibold">Gender</TableCell>
                <TableCell className="p-3 text-lg font-semibold">Department</TableCell>
                <TableCell className="p-3 text-lg font-semibold">Teaching Subject</TableCell>
                <TableCell className="p-3 text-lg font-semibold">Qualification Certificate</TableCell>
                <TableCell className="p-3 text-lg font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher._id} hover>
                  <TableCell className="p-3">{teacher.fullName}</TableCell>
                  <TableCell className="p-3">{teacher.email}</TableCell>
                  <TableCell className="p-3">{teacher.teacherId}</TableCell>
                  <TableCell className="p-3">{teacher.gender}</TableCell>
                  <TableCell className="p-3">{teacher.department}</TableCell>
                  <TableCell className="p-3">{teacher.teachingSubject}</TableCell>
                  <TableCell className="p-3">{teacher.qualificationCertificate}</TableCell>
                  <TableCell className="p-3">
                    <Button
                      onClick={() => handleDelete(teacher._id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
