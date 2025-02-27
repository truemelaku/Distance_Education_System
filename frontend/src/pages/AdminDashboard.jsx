import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material"
import { People, School, Assessment, Settings, Announcement, MonetizationOn } from "@mui/icons-material"

const AdminDashboard = () => {
  // Mock data - replace with actual data from your backend
  const systemStats = {
    totalStudents: 1500,
    totalTeachers: 50,
    totalCourses: 75,
    activeEnrollments: 3000,
  }

  const recentActivities = [
    { id: 1, action: "New course added", details: "Advanced Machine Learning" },
    { id: 2, action: "User reported issue", details: "Login problem for student ID 12345" },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Message */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body1">Manage and monitor your distance education system.</Typography>
          </Paper>
        </Grid>

        {/* System Statistics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              <Assessment sx={{ mr: 1 }} />
              System Statistics
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Total Students" secondary={systemStats.totalStudents} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Total Teachers" secondary={systemStats.totalTeachers} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Total Courses" secondary={systemStats.totalCourses} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Active Enrollments" secondary={systemStats.activeEnrollments} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              <Announcement sx={{ mr: 1 }} />
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id}>
                  <ListItemText primary={activity.action} secondary={activity.details} />
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
              <Button startIcon={<People />}>Manage Users</Button>
              <Button startIcon={<School />}>Manage Courses</Button>
              <Button startIcon={<MonetizationOn />}>Financial Reports</Button>
              <Button startIcon={<Settings />}>System Settings</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminDashboard

