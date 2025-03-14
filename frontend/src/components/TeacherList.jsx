import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Typography, Paper } from '@mui/material';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        
        setTeachers(response.data);
        setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setLoading(false);  // Stop loading in case of error
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Admin is not logged in'); // Ensure admin is logged in
      return;
    }
    try {
      // Log the token being sent in the request
      console.log('Sending token:', token);
  
      const response = await axios.delete(`http://localhost:5000/api/teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the request headers
        },
      });
  
      console.log('Delete response:', response);
  
      // Update UI by removing the deleted teacher from the list
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      alert('Teacher deleted successfully');
    } catch (error) {
      console.error('Error deleting teacher:', error);
      
      // Check if there is a server response
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Server error:', error.response.data);
        alert(`Error deleting teacher: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
        alert('No response from server. Please try again later.');
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  
  
  

  return (
    <Box className="max-w-6xl mx-auto p-6">
      <Typography variant="h4" className="text-center mb-6 text-gray-700 font-bold">Teacher List</Typography>
      
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
              {teachers.map(teacher => (
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
                      className="font-bold">
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
