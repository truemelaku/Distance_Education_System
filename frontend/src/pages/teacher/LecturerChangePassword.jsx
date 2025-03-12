import { Typography, Box, TextField, Button, Grid } from "@mui/material"

function LecturerChangePassword() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Current Password" type="password" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="New Password" type="password" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Confirm New Password" type="password" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default LecturerChangePassword

