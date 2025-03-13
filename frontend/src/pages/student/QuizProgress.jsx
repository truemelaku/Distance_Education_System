import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material"

const QuizProgress = () => {
  const quizzes = [
    { id: 1, name: "Math Quiz 1", score: 85, totalQuestions: 20, completed: 20 },
    { id: 2, name: "Science Quiz 2", score: 90, totalQuestions: 25, completed: 25 },
    { id: 3, name: "History Quiz 1", score: 75, totalQuestions: 30, completed: 22 },
    { id: 4, name: "English Quiz 3", score: null, totalQuestions: 15, completed: 10 },
  ]

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Quiz Progress
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quiz Name</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell component="th" scope="row">
                  {quiz.name}
                </TableCell>
                <TableCell align="right">{quiz.score !== null ? `${quiz.score}%` : "Not completed"}</TableCell>
                <TableCell align="right">
                  <LinearProgress
                    variant="determinate"
                    value={(quiz.completed / quiz.totalQuestions) * 100}
                    sx={{ minWidth: 100 }}
                  />
                  {`${quiz.completed}/${quiz.totalQuestions}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default QuizProgress

