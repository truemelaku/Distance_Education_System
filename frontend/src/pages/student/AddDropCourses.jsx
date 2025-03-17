"use client"

import { useState } from "react"
import { Typography, Paper, List, ListItem, ListItemText, Button, TextField, Grid } from "@mui/material"

const AddDropCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Introduction to Computer Science", enrolled: true },
    { id: 2, name: "Calculus I", enrolled: true },
    { id: 3, name: "English Composition", enrolled: false },
    { id: 4, name: "World History", enrolled: false },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const handleEnrollment = (id) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, enrolled: !course.enrolled } : course)))
  }

  const filteredCourses = courses.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add/Drop Courses
      </Typography>
      <TextField
        fullWidth
        label="Search Courses"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Available Courses
          </Typography>
          <List>
            {filteredCourses
              .filter((course) => !course.enrolled)
              .map((course) => (
                <ListItem key={course.id} divider>
                  <ListItemText primary={course.name} />
                  <Button variant="contained" color="primary" onClick={() => handleEnrollment(course.id)}>
                    Add
                  </Button>
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Enrolled Courses
          </Typography>
          <List>
            {filteredCourses
              .filter((course) => course.enrolled)
              .map((course) => (
                <ListItem key={course.id} divider>
                  <ListItemText primary={course.name} />
                  <Button variant="outlined" color="secondary" onClick={() => handleEnrollment(course.id)}>
                    Drop
                  </Button>
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AddDropCourses

