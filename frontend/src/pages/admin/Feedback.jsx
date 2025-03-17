import { Box, Typography, Paper, List, ListItem, ListItemText, Rating } from "@mui/material"

const Feedback = () => {
  const feedbacks = [
    { id: 1, course: "CS101", student: "John Doe", message: "Great course content!", rating: 5, date: "2023-09-15" },
    {
      id: 2,
      course: "CS201",
      student: "Jane Smith",
      message: "The pace was a bit fast.",
      rating: 3,
      date: "2023-09-16",
    },
    {
      id: 3,
      course: "CS301",
      student: "Bob Johnson",
      message: "Very helpful instructor.",
      rating: 4,
      date: "2023-09-17",
    },
    {
      id: 4,
      course: "CS401",
      student: "Alice Brown",
      message: "Challenging but rewarding.",
      rating: 5,
      date: "2023-09-18",
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Student Feedback
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <List>
          {feedbacks.map((feedback) => (
            <ListItem key={feedback.id} divider>
              <ListItemText primary={feedback.message} secondary={`${feedback.student} - ${feedback.course}`} />
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Rating value={feedback.rating} readOnly size="small" />
                <Typography variant="caption" color="text.secondary">
                  {feedback.date}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default Feedback

