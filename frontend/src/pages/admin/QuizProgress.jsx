import { Box, Typography, Paper, LinearProgress, Grid } from "@mui/material"

const QuizProgress = () => {
  const quizzes = [
    { id: 1, name: "Quiz 1: Introduction", course: "CS101", progress: 75 },
    { id: 2, name: "Quiz 2: Data Structures", course: "CS201", progress: 60 },
    { id: 3, name: "Quiz 3: Algorithms", course: "CS201", progress: 40 },
    { id: 4, name: "Quiz 4: Database Basics", course: "CS301", progress: 90 },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quiz Progress
      </Typography>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} key={quiz.id}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                {quiz.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Course: {quiz.course}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress variant="determinate" value={quiz.progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round(quiz.progress)}%`}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default QuizProgress

