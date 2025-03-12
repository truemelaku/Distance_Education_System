import { Box, Typography, Paper, Grid, Button } from "@mui/material"

const AdminHome = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to EduConnect
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Quick Start Guide
        </Typography>
        <Typography paragraph>
          Welcome to the EduConnect Learning Management System. As an administrator, you have access to all features of
          the system. Use the navigation menu on the left to access different sections of the admin dashboard.
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              View Students
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              Manage Courses
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              View Reports
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              System Settings
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              System Announcements
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {item === 1 ? "System Maintenance" : item === 2 ? "New Feature Release" : "Important Update"}
                  </Typography>
                  <Typography variant="body2">
                    {item === 1
                      ? "Scheduled maintenance on Sunday, 2 AM - 4 AM."
                      : item === 2
                        ? "New grading system has been implemented."
                        : "Please update your profile information."}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(Date.now() - item * 86400000).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Recent System Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box
                  key={item}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Typography variant="body2">
                    <strong>{item === 1 ? "Admin" : item === 2 ? "System" : item === 3 ? "Teacher" : "Student"}</strong>
                    :{" "}
                    {item === 1
                      ? "Updated system settings"
                      : item === 2
                        ? "Automatic backup completed"
                        : item === 3
                          ? "New course materials uploaded"
                          : item === 4
                            ? "New student registration"
                            : "Fee payment received"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item} hour{item !== 1 ? "s" : ""} ago
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminHome

