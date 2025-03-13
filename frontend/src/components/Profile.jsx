import { Container, Typography, Paper, Grid, TextField, Button } from "@mui/material"

const Profile = ({ userRole }) => {
  // This data should come from your backend
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: userRole,
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" defaultValue={userData.name} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" defaultValue={userData.email} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Role" defaultValue={userData.role} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">Edit Profile</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Profile

