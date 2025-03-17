"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  LinearProgress,
} from "@mui/material"
import {
  Book,
  Assignment,
  Quiz,
  VideoLibrary,
  CalendarToday,
  ArrowForward,
  Download,
  OpenInNew,
} from "@mui/icons-material"

const MyCourses = () => {
  const [courses, setCourses] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        // In a real app, you would use the actual API call
        // const response = await studentApi.getMyCourses();
        // setCourses(response.data);

        // For demo purposes, we'll simulate an API response
        setTimeout(() => {
          setCourses({
            current: [
              {
                id: 1,
                code: "CS301",
                title: "Database Systems",
                instructor: "Dr. Smith",
                progress: 75,
                nextClass: "2023-11-15T14:30:00",
                assignments: 3,
                quizzes: 2,
                materials: 12,
                description:
                  "This course covers database design, development, and management. Topics include data models, normalization, SQL, and database administration.",
                image: "/placeholder.svg?height=150&width=300",
              },
              {
                id: 2,
                code: "CS302",
                title: "Data Structures",
                instructor: "Prof. Johnson",
                progress: 60,
                nextClass: "2023-11-16T10:00:00",
                assignments: 4,
                quizzes: 3,
                materials: 15,
                description:
                  "This course introduces fundamental data structures and algorithms. Topics include arrays, linked lists, stacks, queues, trees, and graphs.",
                image: "/placeholder.svg?height=150&width=300",
              },
              {
                id: 3,
                code: "CS303",
                title: "Human-Computer Interaction",
                instructor: "Dr. Williams",
                progress: 45,
                nextClass: "2023-11-17T13:00:00",
                assignments: 2,
                quizzes: 1,
                materials: 8,
                description:
                  "This course explores the design and evaluation of user interfaces. Topics include usability, user-centered design, and interface evaluation methods.",
                image: "/placeholder.svg?height=150&width=300",
              },
              {
                id: 4,
                code: "CS304",
                title: "Software Engineering",
                instructor: "Prof. Brown",
                progress: 30,
                nextClass: "2023-11-15T09:00:00",
                assignments: 5,
                quizzes: 2,
                materials: 10,
                description:
                  "This course covers software development methodologies, project management, and quality assurance. Topics include agile development, testing, and version control.",
                image: "/placeholder.svg?height=150&width=300",
              },
            ],
            completed: [
              {
                id: 5,
                code: "CS201",
                title: "Introduction to Programming",
                instructor: "Dr. Davis",
                grade: "A",
                semester: "Spring 2022",
                credits: 3,
                description:
                  "This course introduces programming concepts using Python. Topics include variables, control structures, functions, and basic data structures.",
                image: "/placeholder.svg?height=150&width=300",
              },
              {
                id: 6,
                code: "CS202",
                title: "Computer Architecture",
                instructor: "Prof. Miller",
                grade: "B+",
                semester: "Fall 2022",
                credits: 4,
                description:
                  "This course explores computer organization and architecture. Topics include digital logic, CPU design, memory systems, and I/O interfaces.",
                image: "/placeholder.svg?height=150&width=300",
              },
              {
                id: 7,
                code: "CS203",
                title: "Discrete Mathematics",
                instructor: "Dr. Wilson",
                grade: "A-",
                semester: "Spring 2022",
                credits: 3,
                description:
                  "This course covers mathematical foundations of computer science. Topics include logic, sets, relations, functions, and graph theory.",
                image: "/placeholder.svg?height=150&width=300",
              },
            ],
            upcoming: [
              {
                id: 8,
                code: "CS401",
                title: "Artificial Intelligence",
                instructor: "Dr. Lee",
                startDate: "2024-01-15",
                credits: 4,
                prerequisites: ["CS302", "CS203"],
                description:
                  "This course introduces artificial intelligence concepts and techniques. Topics include search algorithms, knowledge representation, and machine learning.",
                image: "/placeholder.svg?height=150&width=300",
              },
              {
                id: 9,
                code: "CS402",
                title: "Computer Networks",
                instructor: "Prof. Taylor",
                startDate: "2024-01-15",
                credits: 3,
                prerequisites: ["CS304"],
                description:
                  "This course covers computer network principles and protocols. Topics include network architecture, routing, TCP/IP, and network security.",
                image: "/placeholder.svg?height=150&width=300",
              },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError("Failed to load course data. Please try again later.")
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  if (loading && !courses) {
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

  return (
    <Box sx={{ p: 3 }}>
      {courses && (
        <>
          <Typography variant="h4" gutterBottom>
            My Courses
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label={`Current (${courses.current.length})`} />
            <Tab label={`Completed (${courses.completed.length})`} />
            <Tab label={`Upcoming (${courses.upcoming.length})`} />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={3}>
              {courses.current.map((course) => (
                <Grid item xs={12} md={6} key={course.id}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardHeader
                      title={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Book color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            {course.code}: {course.title}
                          </Typography>
                        </Box>
                      }
                      subheader={`Instructor: ${course.instructor}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Course Progress
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: "100%", mr: 1 }}>
                            <LinearProgress variant="determinate" value={course.progress} />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${course.progress}%`}</Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {course.description}
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: "center" }}>
                            <Assignment color="primary" />
                            <Typography variant="body2" color="text.secondary">
                              Assignments
                            </Typography>
                            <Typography variant="h6">{course.assignments}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: "center" }}>
                            <Quiz color="primary" />
                            <Typography variant="body2" color="text.secondary">
                              Quizzes
                            </Typography>
                            <Typography variant="h6">{course.quizzes}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: "center" }}>
                            <VideoLibrary color="primary" />
                            <Typography variant="body2" color="text.secondary">
                              Materials
                            </Typography>
                            <Typography variant="h6">{course.materials}</Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarToday fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Next Class: {new Date(course.nextClass).toLocaleString()}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        size="small"
                        endIcon={<ArrowForward />}
                        onClick={() => (window.location.href = `/student-dashboard/course/${course.id}`)}
                      >
                        Go to Course
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              {courses.completed.map((course) => (
                <Grid item xs={12} md={6} key={course.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardHeader
                      title={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Book color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            {course.code}: {course.title}
                          </Typography>
                        </Box>
                      }
                      subheader={`Instructor: ${course.instructor}`}
                      action={<Chip label={`Grade: ${course.grade}`} color="primary" variant="outlined" />}
                    />
                    <CardContent>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {course.description}
                      </Typography>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Semester
                          </Typography>
                          <Typography variant="body1">{course.semester}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Credits
                          </Typography>
                          <Typography variant="body1">{course.credits}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button size="small" startIcon={<Download />}>
                        Download Certificate
                      </Button>
                      <Button
                        size="small"
                        startIcon={<OpenInNew />}
                        onClick={() => (window.location.href = `/student-dashboard/course/${course.id}`)}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={3}>
              {courses.upcoming.map((course) => (
                <Grid item xs={12} md={6} key={course.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardHeader
                      title={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Book color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            {course.code}: {course.title}
                          </Typography>
                        </Box>
                      }
                      subheader={`Instructor: ${course.instructor}`}
                    />
                    <CardContent>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {course.description}
                      </Typography>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Start Date
                          </Typography>
                          <Typography variant="body1">{new Date(course.startDate).toLocaleDateString()}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Credits
                          </Typography>
                          <Typography variant="body1">{course.credits}</Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Prerequisites
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {course.prerequisites.map((prereq) => (
                            <Chip key={prereq} label={prereq} size="small" />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => (window.location.href = `/student-dashboard/course/${course.id}`)}
                      >
                        Enroll Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  )
}

export default MyCourses

