import { Typography, Box, Paper, Grid, Avatar } from "@mui/material"

function LecturerProfile() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar sx={{ width: 200, height: 200, mx: "auto" }} alt="Lecturer Name" src="/placeholder.svg" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Amir Mohammed</Typography>
            <Typography variant="body1">Department: Computer Science</Typography>
            <Typography variant="body1">Email: amir.mohammed@example.com</Typography>
            <Typography variant="body1">Phone: +1234567890</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default LecturerProfile

