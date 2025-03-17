"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  Chip,
} from "@mui/material"
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  VideoLibrary,
  Book,
  Assignment,
  Today,
  Schedule,
  EventNote,
  Info,
  DownloadForOffline,
} from "@mui/icons-material"

const ClassSchedule = () => {
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState(0) // 0: Week, 1: Month, 2: List

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
          setSchedule({
            // Current week's schedule (5 days)
            weeklySchedule: [
              {
                date: "2023-11-13", // Monday
                day: "Monday",
                classes: [
                  {
                    id: 1,
                    course: "Database Systems",
                    courseCode: "CS301",
                    time: "10:00 AM - 11:30 AM",
                    instructor: "Dr. Smith",
                    location: "Online (Zoom)",
                    type: "Lecture",
                    link: "https://zoom.us/j/123456789",
                  },
                  {
                    id: 2,
                    course: "Data Structures",
                    courseCode: "CS302",
                    time: "2:00 PM - 3:30 PM",
                    instructor: "Prof. Johnson",
                    location: "Online (Google Meet)",
                    type: "Lab",
                    link: "https://meet.google.com/abc-defg-hij",
                  },
                ],
              },
              {
                date: "2023-11-14", // Tuesday
                day: "Tuesday",
                classes: [
                  {
                    id: 3,
                    course: "Human-Computer Interaction",
                    courseCode: "CS303",
                    time: "9:00 AM - 10:30 AM",
                    instructor: "Dr. Williams",
                    location: "Online (Zoom)",
                    type: "Lecture",
                    link: "https://zoom.us/j/987654321",
                  },
                ],
              },
              {
                date: "2023-11-15", // Wednesday
                day: "Wednesday",
                classes: [
                  {
                    id: 4,
                    course: "Database Systems",
                    courseCode: "CS301",
                    time: "10:00 AM - 11:30 AM",
                    instructor: "Dr. Smith",
                    location: "Online (Zoom)",
                    type: "Lecture",
                    link: "https://zoom.us/j/123456789",
                  },
                  {
                    id: 5,
                    course: "Software Engineering",
                    courseCode: "CS304",
                    time: "1:00 PM - 2:30 PM",
                    instructor: "Prof. Brown",
                    location: "Online (Google Meet)",
                    type: "Project Discussion",
                    link: "https://meet.google.com/xyz-abcd-123",
                  },
                ],
              },
              {
                date: "2023-11-16", // Thursday
                day: "Thursday",
                classes: [
                  {
                    id: 6,
                    course: "Human-Computer Interaction",
                    courseCode: "CS303",
                    time: "9:00 AM - 10:30 AM",
                    instructor: "Dr. Williams",
                    location: "Online (Zoom)",
                    type: "Lecture",
                    link: "https://zoom.us/j/987654321",
                  },
                ],
              },
              {
                date: "2023-11-17", // Friday
                day: "Friday",
                classes: [
                  {
                    id: 7,
                    course: "Data Structures",
                    courseCode: "CS302",
                    time: "2:00 PM - 3:30 PM",
                    instructor: "Prof. Johnson",
                    location: "Online (Google Meet)",
                    type: "Lab",
                    link: "https://meet.google.com/abc-defg-hij",
                  },
                  {
                    id: 8,
                    course: "Software Engineering",
                    courseCode: "CS304",
                    time: "4:00 PM - 5:30 PM",
                    instructor: "Prof. Brown",
                    location: "Online (Google Meet)",
                    type: "Group Work",
                    link: "https://meet.google.com/xyz-abcd-123",
                  },
                ],
              },
            ],
            // Due dates and upcoming events
            upcomingEvents: [
              {
                id: 101,
                title: "Database Project Submission",
                course: "CS301: Database Systems",
                dueDate: "2023-11-20T23:59:00",
                type: "Assignment",
                description: "Final project submission including documentation.",
              },
              {
                id: 102,
                title: "Data Structures Quiz",
                course: "CS302: Data Structures",
                dueDate: "2023-11-17T14:00:00",
                type: "Quiz",
                description: "Online quiz covering binary trees and graphs.",
              },
              {
                id: 103,
                title: "UI Design Evaluation",
                course: "CS303: Human-Computer Interaction",
                dueDate: "2023-11-22T23:59:00",
                type: "Assignment",
                description: "Evaluate a web application using the heuristics discussed in class.",
              },
              {
                id: 104,
                title: "Mid-semester Feedback",
                course: "All Courses",
                dueDate: "2023-11-19T23:59:00",
                type: "Feedback",
                description: "Provide feedback on your courses and instructors.",
              },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Error fetching schedule:", err)
        setError("Failed to load class schedule. Please try again later.")
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [])

  const handleViewChange = (event, newValue) => {
    setViewMode(newValue)
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + direction * 7)
    setCurrentDate(newDate)
  }

  // Format date string to display
  const formatDateDisplay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Get start and end of week for display
  const getWeekRange = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay() + 1) // Monday of current week

    const end = new Date(start)
    end.setDate(end.getDate() + 4) // Friday of current week

    return {
      start: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      end: end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }
  }

  // Check if a date is today
  const isToday = (dateString) => {
    const today = new Date()
    const date = new Date(dateString)
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Format time until due date
  const getTimeUntilDue = (isoString) => {
    const now = new Date()
    const dueDate = new Date(isoString)
    const diffMs = dueDate - now

    if (diffMs < 0) return "Overdue"

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} left`

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} left`

    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} left`
  }

  // Get color based on time until due
  const getDueColor = (isoString) => {
    const now = new Date()
    const dueDate = new Date(isoString)
    const diffMs = dueDate - now

    if (diffMs < 0) return "error"

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays <= 1) return "error"
    if (diffDays <= 3) return "warning"
    return "success"
  }

  // Get icon based on event type
  const getEventIcon = (type) => {
    switch (type) {
      case "Assignment":
        return <Assignment color="primary" />
      case "Quiz":
        return <Book color="secondary" />
      case "Exam":
        return <EventNote color="error" />
      case "Feedback":
        return <Info color="info" />
      default:
        return <Today />
    }
  }

  if (loading && !schedule) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    )
  }

  const weekRange = getWeekRange()

  return (
    <Box sx={{ p: 3 }}>
      {schedule && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <CalendarMonth fontSize="large" color="primary" sx={{ mr: 2 }} />
            <Typography variant="h4">Class Schedule</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Tabs value={viewMode} onChange={handleViewChange}>
              <Tab label="Weekly View" />
              <Tab label="Monthly View" />
              <Tab label="List View" />
            </Tabs>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => navigateWeek(-1)}>
                <ChevronLeft />
              </IconButton>
              <Typography variant="subtitle1" sx={{ mx: 1 }}>
                {weekRange.start} - {weekRange.end}
              </Typography>
              <IconButton onClick={() => navigateWeek(1)}>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>

          {viewMode === 0 && (
            <Grid container spacing={3}>
              {schedule.weeklySchedule.map((day) => (
                <Grid item xs={12} md={6} lg={2.4} key={day.date}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      height: "100%",
                      bgcolor: isToday(day.date) ? "primary.50" : "background.paper",
                      border: isToday(day.date) ? "1px solid" : "none",
                      borderColor: "primary.main",
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      color={isToday(day.date) ? "primary.main" : "text.primary"}
                      sx={{ fontWeight: isToday(day.date) ? "bold" : "normal" }}
                    >
                      {day.day}
                      {isToday(day.date) && <Chip label="Today" color="primary" size="small" sx={{ ml: 1 }} />}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {formatDateDisplay(day.date)}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {day.classes.length > 0 ? (
                      day.classes.map((cls) => (
                        <Box key={cls.id} sx={{ mb: 2, p: 1, bgcolor: "background.paper", borderRadius: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "medium",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {cls.courseCode}
                            <Chip
                              label={cls.type}
                              size="small"
                              sx={{ ml: 1 }}
                              color={cls.type === "Lecture" ? "primary" : "secondary"}
                            />
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {cls.course}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <Schedule fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                            <Typography variant="body2" color="text.secondary">
                              {cls.time}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <VideoLibrary fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                            <Typography variant="body2" color="text.secondary">
                              {cls.location}
                            </Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mt: 1 }}
                            href={cls.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join Class
                          </Button>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                        No classes scheduled
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {viewMode === 1 && (
            <Typography variant="h6" sx={{ textAlign: "center", my: 4 }}>
              Monthly view is under development. Please use Weekly or List view.
            </Typography>
          )}

          {viewMode === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    All Scheduled Classes
                  </Typography>

                  {schedule.weeklySchedule.map((day) => (
                    <Box key={day.date} sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: isToday(day.date) ? "bold" : "medium",
                            color: isToday(day.date) ? "primary.main" : "text.primary",
                          }}
                        >
                          {day.day}, {formatDateDisplay(day.date)}
                        </Typography>
                        {isToday(day.date) && <Chip label="Today" color="primary" size="small" sx={{ ml: 1 }} />}
                      </Box>

                      {day.classes.length > 0 ? (
                        day.classes.map((cls) => (
                          <Box
                            key={cls.id}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              p: 1.5,
                              mb: 1,
                              borderLeft: "4px solid",
                              borderColor: cls.type === "Lecture" ? "primary.main" : "secondary.main",
                              borderRadius: 1,
                              bgcolor: "background.paper",
                            }}
                          >
                            <Box>
                              <Typography variant="subtitle1">
                                {cls.courseCode}: {cls.course}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {cls.time} • {cls.instructor} • {cls.type}
                              </Typography>
                            </Box>
                            <Button
                              variant="outlined"
                              size="small"
                              href={cls.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Join
                            </Button>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ py: 1, ml: 1 }}>
                          No classes scheduled
                        </Typography>
                      )}

                      <Divider sx={{ my: 2 }} />
                    </Box>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Upcoming Deadlines
                  </Typography>

                  {schedule.upcomingEvents.map((event) => (
                    <Card key={event.id} sx={{ mb: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                          <Box sx={{ mr: 2, mt: 0.5 }}>{getEventIcon(event.type)}</Box>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">{event.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {event.course}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                color: getDueColor(event.dueDate) + ".main",
                              }}
                            >
                              Due: {new Date(event.dueDate).toLocaleString()} ({getTimeUntilDue(event.dueDate)})
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {event.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" startIcon={<DownloadForOffline />}>
                          Download
                        </Button>
                        <Button size="small" color="primary">
                          Submit
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Paper>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mb: 3 }}
                  onClick={() => window.open("/student-dashboard/assignment-results", "_self")}
                >
                  View All Assignments
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    /* Handle calendar download */
                  }}
                  startIcon={<DownloadForOffline />}
                >
                  Download Calendar (iCal)
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Box>
  )
}

export default ClassSchedule

