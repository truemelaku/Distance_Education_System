import { Typography, Box, TextField, Button, Grid } from "@mui/material"

function LecturerSettings() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" defaultValue="Amir" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" defaultValue="Mohammed" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" type="email" defaultValue="amir.mohammed@example.com" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone" defaultValue="+1234567890" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default LecturerSettings

