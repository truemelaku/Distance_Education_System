import { Grid, Paper, Typography, List, ListItem, ListItemText, Button, Container, Box } from "@mui/material"
import { School, Assignment, DateRange, VideoLibrary } from "@mui/icons-material"

const StudentDashboard = () => {
  // Mock data - replace with actual data from your backend
  const enrolledCourses = [
    { id: 1, name: "Introduction to Web Development", progress: 60 },
    { id: 2, name: "Data Science Fundamentals", progress: 30 },
  ]

  const upcomingAssignments = [
    { id: 1, name: "JavaScript Basics Quiz", dueDate: "2024-03-15" },
    { id: 2, name: "Data Visualization Project", dueDate: "2024-03-20" },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Message */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
              Welcome, Student!
            </Typography>
            <Typography variant="body1">Here's an overview of your learning progress and upcoming tasks.</Typography>
          </Paper>
        </Grid>

        {/* Enrolled Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              <School sx={{ mr: 1 }} />
              Enrolled Courses
            </Typography>
            <List>
              {enrolledCourses.map((course) => (
                <ListItem key={course.id}>
                  <ListItemText primary={course.name} secondary={`Progress: ${course.progress}%`} />
                  <Button variant="outlined" size="small">
                    Continue
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Assignments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              <Assignment sx={{ mr: 1 }} />
              Upcoming Assignments
            </Typography>
            <List>
              {upcomingAssignments.map((assignment) => (
                <ListItem key={assignment.id}>
                  <ListItemText primary={assignment.name} secondary={`Due: ${assignment.dueDate}`} />
                  <Button variant="outlined" size="small">
                    View
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
              <Button startIcon={<VideoLibrary />}>Video Lectures</Button>
              <Button startIcon={<DateRange />}>Schedule</Button>
              <Button startIcon={<Assignment />}>Grades</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StudentDashboard

