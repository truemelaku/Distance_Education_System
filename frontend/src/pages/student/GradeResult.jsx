import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const GradeResult = () => {
  const grades = [
    { id: 1, course: "Mathematics", grade: "A", score: 92 },
    { id: 2, course: "Physics", grade: "B+", score: 87 },
    { id: 3, course: "Chemistry", grade: "A-", score: 89 },
    { id: 4, course: "Biology", grade: "B", score: 84 },
    { id: 5, course: "English Literature", grade: "A", score: 95 },
  ]

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Grade Results
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell component="th" scope="row">
                  {grade.course}
                </TableCell>
                <TableCell align="right">{grade.grade}</TableCell>
                <TableCell align="right">{grade.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default GradeResult

