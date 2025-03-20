<<<<<<< HEAD
"use client"

import { useState } from "react"
=======
import { useState, useEffect } from "react";
import axios from "axios";
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
import {
  Box,
  Typography,
  Paper,
<<<<<<< HEAD
  Grid,
  TextField,
  Button,
=======
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
<<<<<<< HEAD
  Chip,
=======
  Button,
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
<<<<<<< HEAD
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
=======
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, AddCircle, RemoveCircle } from "@mui/icons-material";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentLecture, setCurrentLecture] = useState({
    teacherId: "",
    courseId: "",
    courseName: "",
    departmentName: "",
    instructor: "",
    teacherIdInstructor: "",
    date: "",
    semester: "",
    creditHour: "",
    status: "Scheduled",
  });

  useEffect(() => {
    fetchLectures();
    fetchTeachers();
  }, []);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/lectures");
      console.log("Fetched Lectures:", res.data);
      setLectures(res.data);
    } catch (err) {
      console.error("Error fetching lectures:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      console.log("Fetched Teachers:", res.data);
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err.response?.data || err.message);
    }
  };

  const handleOpenDialog = (lecture = null) => {
    if (lecture) {
      const formattedDate = lecture.date ? new Date(lecture.date).toISOString().split("T")[0] : "";
      setCurrentLecture({
        teacherId: lecture.teacherId || "",
        courseId: lecture.courseId || "",
        courseName: lecture.courseName || "",
        departmentName: lecture.departmentName || "",
        instructor: lecture.instructor || "",
        teacherIdInstructor: lecture.teacherIdInstructor || "",
        date: formattedDate,
        semester: lecture.semester || "",
        creditHour: lecture.creditHour || "",
        status: lecture.status || "Scheduled",
      });
    } else {
      setCurrentLecture({
        teacherId: "",
        courseId: "",
        courseName: "",
        departmentName: "",
        instructor: "",
        teacherIdInstructor: "",
        date: "",
        semester: "",
        creditHour: "",
        status: "Scheduled",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "teacherId") {
      const selectedTeacher = teachers.find((t) => t.teacherId === value);
      if (selectedTeacher) {
        setCurrentLecture((prev) => ({
          ...prev,
          teacherId: selectedTeacher.teacherId,
          instructor: selectedTeacher.fullName, // Autofill instructor
          teacherIdInstructor: selectedTeacher.teacherId, // Autofill teacherIdInstructor
          departmentName: selectedTeacher.department,
        }));
      }
    } else if (name === "instructor") {
      const selectedTeacher = teachers.find((t) => t.teacherId === value);
      if (selectedTeacher) {
        setCurrentLecture((prev) => ({
          ...prev,
          instructor: selectedTeacher.fullName,
          teacherIdInstructor: selectedTeacher.teacherId,
          departmentName: selectedTeacher.department,
        }));
      }
    } else {
      setCurrentLecture((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreditHourChange = (delta) => {
    const currentValue = parseInt(currentLecture.creditHour || "0", 10);
    const newValue = Math.max(0, currentValue + delta);
    setCurrentLecture((prev) => ({ ...prev, creditHour: newValue.toString() }));
  };

  const handleSaveLecture = async () => {
    try {
      console.log("Submitting Lecture:", currentLecture);

      if (
        !currentLecture.teacherId ||
        !currentLecture.courseId ||
        !currentLecture.teacherIdInstructor ||
        !currentLecture.semester ||
        !currentLecture.creditHour
      ) {
        alert("Please fill all required fields: Teacher ID, Course ID, Instructor, Semester, and Credit Hour.");
        return;
      }

      let res;
      if (currentLecture._id) {
        res = await axios.put(`http://localhost:5000/api/lectures/${currentLecture._id}`, currentLecture);
        console.log("Update Response:", res.data);
        setLectures((prev) => prev.map((lec) => (lec._id === res.data._id ? res.data : lec)));
      } else {
        res = await axios.post("http://localhost:5000/api/lectures", currentLecture);
        console.log("Create Response:", res.data);
        setLectures((prev) => [...prev, res.data]);
      }

      handleCloseDialog();
    } catch (err) {
      console.error("Error saving lecture:", err.response?.data || err.message);
      alert("Failed to save lecture: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteLecture = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/lectures/${id}`);
      setLectures((prev) => prev.filter((lec) => lec._id !== id));
    } catch (err) {
      console.error("Error deleting lecture:", err.response?.data || err.message);
    }
  };
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Lectures Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Lecture
        </Button>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
<<<<<<< HEAD
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

=======
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
<<<<<<< HEAD
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
=======
                <TableCell>Teacher ID</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Credit Hour</TableCell>
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
<<<<<<< HEAD
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
=======
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">Loading...</TableCell>
                </TableRow>
              ) : lectures.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">No lectures available.</TableCell>
                </TableRow>
              ) : (
                lectures.map((lecture) => (
                  <TableRow key={lecture._id}>
                    <TableCell>{lecture.teacherId}</TableCell>
                    <TableCell>{lecture.courseName} ({lecture.courseId})</TableCell>
                    <TableCell>{lecture.departmentName}</TableCell>
                    <TableCell>{lecture.instructor}</TableCell>
                    <TableCell>{new Date(lecture.date).toLocaleDateString()}</TableCell>
                    <TableCell>{lecture.semester}</TableCell>
                    <TableCell>{lecture.creditHour}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(lecture)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteLecture(lecture._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

<<<<<<< HEAD
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
=======
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{currentLecture._id ? "Edit Lecture" : "Add Lecture"}</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Teacher ID"
            name="teacherId"
            value={currentLecture.teacherId || ""}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher.teacherId}>
                {teacher.teacherId}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Course ID"
            name="courseId"
            value={currentLecture.courseId}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Course Name"
            name="courseName"
            value={currentLecture.courseName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            select
            label="Instructor"
            name="instructor"
            value={currentLecture.teacherIdInstructor || ""}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher.teacherId}>
                {teacher.fullName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={currentLecture.date}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            select
            label="Semester"
            name="semester"
            value={currentLecture.semester || ""}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
          </TextField>
          <TextField
            label="Credit Hour"
            name="creditHour"
            value={currentLecture.creditHour}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => handleCreditHourChange(-1)}>
                    <RemoveCircle />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleCreditHourChange(1)}>
                    <AddCircle />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveLecture} variant="contained" color="primary">
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
<<<<<<< HEAD
  )
}

export default Lectures

=======
  );
};

export default Lectures;
>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539
