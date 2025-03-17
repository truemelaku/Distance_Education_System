import { Box, Typography, Paper, Grid, Button } from "@mui/material"

const ProgramsAndCourses = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Programs and Courses
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Manage Programs and Courses
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              View Programs
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              View Courses
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>
              Add New Program
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>
              Add New Course
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default ProgramsAndCourses

