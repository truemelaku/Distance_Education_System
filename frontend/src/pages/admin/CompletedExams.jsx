import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const CompletedExams = () => {
  const exams = [
    { id: 1, name: "Midterm Exam", course: "CS101", date: "2023-10-15", students: 120 },
    { id: 2, name: "Final Exam", course: "CS201", date: "2023-12-20", students: 95 },
    { id: 3, name: "Project Presentation", course: "CS301", date: "2023-11-30", students: 50 },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Completed Exams
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exam Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Students Participated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.name}</TableCell>
                  <TableCell>{exam.course}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.students}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default CompletedExams

