import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material"

const AssignmentResult = () => {
  const assignments = [
    { id: 1, name: "Math Problem Set 1", score: 95, totalPoints: 100, status: "Graded" },
    { id: 2, name: "Physics Lab Report", score: 85, totalPoints: 100, status: "Graded" },
    { id: 3, name: "English Essay", score: null, totalPoints: 50, status: "Submitted" },
    { id: 4, name: "History Research Paper", score: null, totalPoints: 200, status: "Not Started" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Graded":
        return "success"
      case "Submitted":
        return "primary"
      case "Not Started":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Assignment Results
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assignment Name</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Total Points</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell component="th" scope="row">
                  {assignment.name}
                </TableCell>
                <TableCell align="right">{assignment.score !== null ? assignment.score : "-"}</TableCell>
                <TableCell align="right">{assignment.totalPoints}</TableCell>
                <TableCell align="right">
                  <Chip label={assignment.status} color={getStatusColor(assignment.status)} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default AssignmentResult

