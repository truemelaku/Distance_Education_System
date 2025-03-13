import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"

function LecturerExams() {
  const exams = [
    { id: 1, course: "CS101", name: "Midterm Exam", date: "2023-05-15", status: "Completed" },
    { id: 2, course: "CS201", name: "Final Exam", date: "2023-06-20", status: "Upcoming" },
    { id: 3, course: "CS301", name: "Project Presentation", date: "2023-06-10", status: "Upcoming" },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Complete Exams
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Exam Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.course}</TableCell>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default LecturerExams

