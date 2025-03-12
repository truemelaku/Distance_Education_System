import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material"

const ManageSession = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Session
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Session"
              defaultValue="2023-2024"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Session Start Date"
              type="date"
              defaultValue="2023-09-01"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Session End Date"
              type="date"
              defaultValue="2024-06-30"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Next Session" defaultValue="2024-2025" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Update Session Details
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default ManageSession

