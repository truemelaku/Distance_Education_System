"use client"

import React from "react"
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  LinearProgress,
} from "@mui/material"
import { Book, Assignment, People, Notifications, CalendarMonth, Upload, Grade } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const TeacherHome = () => {
  const navigate = useNavigate()

  // Mock data
  const teacherName = "Dr. Smith"
  const currentSemester = "Fall 2023"

  const assignedCourses = [
    {
      id: 1,
      code: "CS301",
      name: "Database Systems",
      students: 28,
      progress: 75,
    },
    {
      id: 2,
      code: "CS302",
      name: "Data Structures",
      students: 35,
      progress: 60,
    },
    {
      id: 3,
      code: "CS401",
      name: "UI/UX Design",
      students: 22,
      progress: 40,
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      title: "Grade Database Project Submissions",
      course: "CS301",
      dueDate: "Nov 15, 2023",
      count: 18,
      total: 28,
    },
    {
      id: 2,
      title: "Review Quiz Results",
      course: "CS302",
      dueDate: "Nov 18, 2023",
      count: 20,
      total: 35,
    },
    {
      id: 3,
      title: "Upload Week 8 Materials",
      course: "CS401",
      dueDate: "Nov 10, 2023",
      count: 0,
      total: 1,
    },
  ]

  const upcomingSchedule = [
    {
      id: 1,
      title: "Database Systems Lecture",
      time: "09:00 - 10:30",
      location: "Room 301",
    },
    {
      id: 2,
      title: "Data Structures Lab",
      time: "11:00 - 12:30",
      location: "Computer Lab 2",
    },
    {
      id: 3,
      title: "Office Hours",
      time: "14:00 - 15:30",
      location: "Office 205",
    },
  ]

  const recentNotifications = [
    {
      id: 1,
      title: "New assignment submission",
      message: "John Doe submitted Database Project",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Grade deadline reminder",
      message: "Final grades due in 2 weeks",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Department meeting",
      message: "CS Department meeting scheduled for Friday",
      time: "2 days ago",
    },
  ]

  return (
    <Box>
      {/* Welcome Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
          color: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {teacherName}!
        </Typography>
        <Typography variant="subtitle1">Computer Science • {currentSemester}</Typography>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-3px)" },
            }}
            onClick={() => navigate("/teacher/upload")}
          >
            <Upload sx={{ mr: 1, color: "primary.main" }} />
            <Typography>Upload Content</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-3px)" },
            }}
            onClick={() => navigate("/teacher/assignments")}
          >
            <Assignment sx={{ mr: 1, color: "secondary.main" }} />
            <Typography>Create Assignment</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-3px)" },
            }}
            onClick={() => navigate("/teacher/scores")}
          >
            <Grade sx={{ mr: 1, color: "error.main" }} />
            <Typography>Manage Scores</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-3px)" },
            }}
            onClick={() => navigate("/teacher/student-management")}
          >
            <People sx={{ mr: 1, color: "success.main" }} />
            <Typography>View Students</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Dashboard Content */}
      <Grid container spacing={3}>
        {/* Assigned Courses */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 0, borderRadius: 2, height: "100%" }}>
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Book sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">My Courses</Typography>
              </Box>
              <Button size="small" onClick={() => navigate("/teacher/courses")}>
                View All
              </Button>
            </Box>
            <List sx={{ p: 0 }}>
              {assignedCourses.map((course, index) => (
                <React.Fragment key={course.id}>
                  <ListItem sx={{ px: 2, py: 1.5 }}>
                    <ListItemText
                      primary={`${course.code}: ${course.name}`}
                      secondary={`${course.students} students enrolled`}
                    />
                    <Box sx={{ width: "40%", ml: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Course Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor:
                              course.progress > 70
                                ? "success.main"
                                : course.progress > 40
                                  ? "warning.main"
                                  : "error.main",
                          },
                        }}
                      />
                    </Box>
                  </ListItem>
                  {index < assignedCourses.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Pending Tasks */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 0, borderRadius: 2, height: "100%" }}>
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Assignment sx={{ mr: 1, color: "secondary.main" }} />
                <Typography variant="h6">Pending Tasks</Typography>
              </Box>
              <Button size="small" onClick={() => navigate("/teacher/assignments")}>
                View All
              </Button>
            </Box>
            <List sx={{ p: 0 }}>
              {pendingTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  <ListItem sx={{ px: 2, py: 1.5 }}>
                    <ListItemText primary={task.title} secondary={`${task.course} • Due: ${task.dueDate}`} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="body2" color="text.secondary" align="right">
                        {task.count}/{task.total} {task.count === 1 ? "item" : "items"}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(task.count / task.total) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          width: 100,
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "primary.main",
                          },
                        }}
                      />
                    </Box>
                  </ListItem>
                  {index < pendingTasks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Today's Schedule */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 0, borderRadius: 2, height: "100%" }}>
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarMonth sx={{ mr: 1, color: "success.main" }} />
                <Typography variant="h6">Today's Schedule</Typography>
              </Box>
              <Button size="small" onClick={() => navigate("/teacher/schedule")}>
                View Calendar
              </Button>
            </Box>
            <List sx={{ p: 0 }}>
              {upcomingSchedule.map((event, index) => (
                <React.Fragment key={event.id}>
                  <ListItem sx={{ px: 2, py: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", mr: 2 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          mt: 0.8,
                          mr: 1.5,
                        }}
                      />
                      <Box
                        sx={{
                          width: 2,
                          height: index < upcomingSchedule.length - 1 ? 40 : 0,
                          bgcolor: "primary.light",
                          ml: 0.5,
                          mt: 1,
                        }}
                      />
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {event.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="primary.main" component="span">
                            {event.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" component="span">
                            {" • "}
                            {event.location}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Notifications */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 0, borderRadius: 2, height: "100%" }}>
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Notifications sx={{ mr: 1, color: "warning.main" }} />
                <Typography variant="h6">Recent Notifications</Typography>
              </Box>
              <Button size="small" onClick={() => navigate("/teacher/notifications")}>
                View All
              </Button>
            </Box>
            <List sx={{ p: 0 }}>
              {recentNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem sx={{ px: 2, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: index === 0 ? "primary.main" : "grey.300" }}>
                        {index === 0 ? <Notifications fontSize="small" /> : notification.title.charAt(0)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={notification.title} secondary={notification.message} />
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </ListItem>
                  {index < recentNotifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeacherHome

