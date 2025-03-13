"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from "@mui/icons-material"

const Lectures = () => {
  const [lectures, setLectures] = useState([
    {
      id: 1,
      title: "Introduction to Computer Science",
      course: "CS101",
      instructor: "Dr. Smith",
      date: "2023-09-15",
      status: "Scheduled",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      course: "CS201",
      instructor: "Dr. Johnson",
      date: "2023-09-16",
      status: "Completed",
    },
    {
      id: 3,
      title: "Database Management Systems",
      course: "CS301",
      instructor: "Dr. Williams",
      date: "2023-09-17",
      status: "Cancelled",
    },
    {
      id: 4,
      title: "Web Development Fundamentals",
      course: "CS401",
      instructor: "Dr. Brown",
      date: "2023-09-18",
      status: "Scheduled",
    },
    {
      id: 5,
      title: "Artificial Intelligence",
      course: "CS501",
      instructor: "Dr. Davis",
      date: "2023-09-19",
      status: "Scheduled",
    },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [currentLecture, setCurrentLecture] = useState({
    id: null,
    title: "",
    course: "",
    instructor: "",
    date: "",
    status: "Scheduled",
  })

  const handleOpenDialog = (lecture = null) => {
    if (lecture) {
      setCurrentLecture({ ...lecture })
    } else {
      setCurrentLecture({
        id: lectures.length + 1,
        title: "",
        course: "",
        instructor: "",
        date: "",
        status: "Scheduled",
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentLecture((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveLecture = () => {
    if (currentLecture.id) {
      // Update existing lecture
      setLectures((prev) => prev.map((lecture) => (lecture.id === currentLecture.id ? currentLecture : lecture)))
    } else {
      // Add new lecture
      setLectures((prev) => [...prev, { ...currentLecture, id: prev.length + 1 }])
    }
    handleCloseDialog()
  }

  const handleDeleteLecture = (id) => {
    setLectures((prev) => prev.filter((lecture) => lecture.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "primary"
      case "Completed":
        return "success"
      case "Cancelled":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Lectures Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Lecture
        </Button>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Lectures"
              placeholder="Search by title, course, or instructor"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField select fullWidth label="Filter by Course" variant="outlined" defaultValue="">
              <MenuItem value="">All Courses</MenuItem>
              <MenuItem value="CS101">CS101</MenuItem>
              <MenuItem value="CS201">CS201</MenuItem>
              <MenuItem value="CS301">CS301</MenuItem>
              <MenuItem value="CS401">CS401</MenuItem>
              <MenuItem value="CS501">CS501</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField select fullWidth label="Filter by Status" variant="outlined" defaultValue="">
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" fullWidth sx={{ height: "100%" }}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lectures.map((lecture) => (
                <TableRow key={lecture.id}>
                  <TableCell>{lecture.id}</TableCell>
                  <TableCell>{lecture.title}</TableCell>
                  <TableCell>{lecture.course}</TableCell>
                  <TableCell>{lecture.instructor}</TableCell>
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell>
                    <Chip label={lecture.status} color={getStatusColor(lecture.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <ViewIcon />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(lecture)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteLecture(lecture.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentLecture.id ? "Edit Lecture" : "Add New Lecture"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lecture Title"
                name="title"
                value={currentLecture.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course"
                name="course"
                value={currentLecture.course}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Instructor"
                name="instructor"
                value={currentLecture.instructor}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={currentLecture.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={currentLecture.status} onChange={handleInputChange} label="Status">
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveLecture} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Lectures

