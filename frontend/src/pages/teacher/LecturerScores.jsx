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
    Button,
  } from "@mui/material"
  
  function LecturerScores() {
    const scores = [
      { id: 1, student: "John Doe", course: "CS101", score: 85 },
      { id: 2, student: "Jane Smith", course: "CS101", score: 92 },
      { id: 3, student: "Bob Johnson", course: "CS201", score: 78 },
    ]
  
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Manage Scores
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score) => (
                <TableRow key={score.id}>
                  <TableCell>{score.student}</TableCell>
                  <TableCell>{score.course}</TableCell>
                  <TableCell>{score.score}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }
  
  export default LecturerScores
  
  