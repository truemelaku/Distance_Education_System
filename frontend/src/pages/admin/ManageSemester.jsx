import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
  } from "@mui/material"
  
  const ManageSemester = () => {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Manage Semester
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Current Semester</InputLabel>
                <Select value="Fall2023" label="Current Semester">
                  <MenuItem value="Fall2023">Fall 2023</MenuItem>
                  <MenuItem value="Spring2024">Spring 2024</MenuItem>
                  <MenuItem value="Summer2024">Summer 2024</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Semester Start Date"
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
                label="Semester End Date"
                type="date"
                defaultValue="2023-12-20"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Registration Deadline"
                type="date"
                defaultValue="2023-08-15"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                Update Semester Details
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    )
  }
  
  export default ManageSemester
  
  