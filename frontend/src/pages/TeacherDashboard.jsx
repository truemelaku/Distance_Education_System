import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material"
import { School, Assignment, People, Forum, VideoLibrary, Assessment } from "@mui/icons-material"

const TeacherDashboard = () => {
  // Mock data - replace with actual data from your backend
  const teachingCourses = [
    { id: 1, name: "Advanced Web Development", students: 30 },
    { id: 2, name: "Machine Learning Basics", students: 25 },
  ]

  const upcomingTasks = [
    { id: 1, task: "Grade JavaScript Projects", dueDate: "2024-03-18" },
    { id: 2, task: "Prepare lecture on Neural Networks", dueDate: "2024-03-22" },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Message */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
              Welcome, Teacher!
            </Typography>
            <Typography variant="body1">Manage your courses and interact with students.</Typography>
          </Paper>
        </Grid>

        {/* Teaching Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              <School sx={{ mr: 1 }} />
              Teaching Courses
            </Typography>
            <List>
              {teachingCourses.map((course) => (
                <ListItem key={course.id}>
                  <ListItemText primary={course.name} secondary={`Students: ${course.students}`} />
                  <Button variant="outlined" size="small">
                    Manage
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              <Assignment sx={{ mr: 1 }} />
              Upcoming Tasks
            </Typography>
            <List>
              {upcomingTasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemText primary={task.task} secondary={`Due: ${task.dueDate}`} />
                  <Button variant="outlined" size="small">
                    Complete
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
              <Button startIcon={<VideoLibrary />}>Upload Lecture</Button>
              <Button startIcon={<Assignment />}>Create Assignment</Button>
              <Button startIcon={<Forum />}>Discussion Forums</Button>
              <Button startIcon={<People />}>Student List</Button>
              <Button startIcon={<Assessment />}>Grade Submissions</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TeacherDashboard

