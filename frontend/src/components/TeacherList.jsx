import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Typography, Paper } from '@mui/material';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/teachers');
        // console.log('Teachers response:', response.data);
        // setTeachers(response.data);
        // setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      setTeachers(teachers.filter(teacher => teacher._id !== id));
      alert('Teacher deleted successfully');
    } catch (error) {
      alert('Error deleting teacher');
      console.error(error);
    }
  };

  return (
    <Box className="max-w-6xl mx-auto p-6" >
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
                      className="font-bold" >
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
