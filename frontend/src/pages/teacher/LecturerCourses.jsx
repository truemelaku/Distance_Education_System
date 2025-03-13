import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material"
import { CheckCircle, Cancel, ArrowForward } from "@mui/icons-material"
import { Link } from "react-router-dom"

function LecturerCourses() {
  const courses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      code: "CS101",
      creditHours: 3,
      year: 2023,
      semester: "Fall",
      isActive: true,
    },
    {
      id: 2,
      name: "Data Structures and Algorithms",
      code: "CS201",
      creditHours: 4,
      year: 2023,
      semester: "Fall",
      isActive: true,
    },
    {
      id: 3,
      name: "Database Management Systems",
      code: "CS301",
      creditHours: 3,
      year: 2023,
      semester: "Spring",
      isActive: false,
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Code</TableCell>
              <TableCell>Cr. Hr</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Current Semester</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.creditHours}</TableCell>
                <TableCell>{course.year}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{course.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/lecturer/courses/${course.id}`} color="primary">
                    <ArrowForward />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default LecturerCourses

