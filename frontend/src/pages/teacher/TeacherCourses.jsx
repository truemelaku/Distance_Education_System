import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TeacherDashboard = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      const teacherId = localStorage.getItem("teacherId");
      const { data } = await axios.get(`/api/teachers/lectures/${teacherId}`);
      setLectures(data);
    };
    fetchLectures();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Lectures
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>Credit Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lectures.map((lecture) => (
            <TableRow key={lecture._id}>
              <TableCell>{lecture.courseName}</TableCell>
              <TableCell>
                {new Date(lecture.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{lecture.semester}</TableCell>
              <TableCell>{lecture.creditHour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TeacherDashboard;
