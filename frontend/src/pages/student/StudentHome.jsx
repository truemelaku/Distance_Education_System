"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Skeleton,
} from "@mui/material";
import {
  Assignment,
  Notifications,
  CalendarToday,
  Timeline,
  Book,
} from "@mui/icons-material";

const StudentHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In a real app, you would use the actual API call
        // const response = await studentApi.getDashboardStats();
        // setDashboardData(response.data);

        // For demo purposes, we'll simulate an API response
        setTimeout(() => {
          setDashboardData({
            name: "John Doe",
            program: "Computer Science",
            semester: "Fall 2023",
            gpa: 3.75,
            completedCredits: 75,
            totalCredits: 120,
            upcomingAssignments: [
              {
                id: 1,
                title: "Database Design Project",
                course: "Database Systems",
                dueDate: "2023-11-15",
              },
              {
                id: 2,
                title: "Algorithm Analysis",
                course: "Data Structures",
                dueDate: "2023-11-18",
              },
              {
                id: 3,
                title: "UI/UX Case Study",
                course: "Human-Computer Interaction",
                dueDate: "2023-11-22",
              },
            ],
            recentAnnouncements: [
              {
                id: 1,
                title: "Campus Closed for Thanksgiving",
                date: "2023-11-10",
              },
              { id: 2, title: "Spring Registration Opens", date: "2023-11-08" },
              {
                id: 3,
                title: "New Library Resources Available",
                date: "2023-11-05",
              },
            ],
            upcomingEvents: [
              { id: 1, title: "Midterm Exams", date: "2023-11-20" },
              { id: 2, title: "Career Fair", date: "2023-11-25" },
              { id: 3, title: "Workshop: Resume Building", date: "2023-11-30" },
            ],
            enrolledCourses: [
              {
                id: 1,
                code: "CS301",
                title: "Database Systems",
                instructor: "Dr. Smith",
              },
              {
                id: 2,
                code: "CS302",
                title: "Data Structures",
                instructor: "Prof. Johnson",
              },
              {
                id: 3,
                code: "CS303",
                title: "Human-Computer Interaction",
                instructor: "Dr. Williams",
              },
              {
                id: 4,
                code: "CS304",
                title: "Software Engineering",
                instructor: "Prof. Brown",
              },
            ],
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item}>
              <Paper sx={{ p: 2 }}>
                <Skeleton
                  variant="rectangular"
                  height={30}
                  width="60%"
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="rectangular" height={100} />
                <Box sx={{ mt: 2 }}>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {dashboardData && (
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "primary.light",
                color: "primary.contrastText",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Welcome back, {dashboardData.name}!
              </Typography>
              <Typography variant="subtitle1">
                {dashboardData.program} • {dashboardData.semester}
              </Typography>
            </Paper>
          </Grid>

          {/* Academic Progress */}
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader
                title="Academic Progress"
                avatar={<Timeline color="primary" />}
              />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{ position: "relative", display: "inline-flex", mr: 2 }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={
                        (dashboardData.completedCredits /
                          dashboardData.totalCredits) *
                        100
                      }
                      size={80}
                      thickness={4}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                      >
                        {Math.round(
                          (dashboardData.completedCredits /
                            dashboardData.totalCredits) *
                            100
                        )}
                        %
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Credits Completed
                    </Typography>
                    <Typography variant="h6">
                      {dashboardData.completedCredits}/
                      {dashboardData.totalCredits}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Current GPA
                </Typography>
                <Typography variant="h6">
                  {dashboardData.gpa.toFixed(2)}/4.00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Assignments */}
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader
                title="Upcoming Assignments"
                avatar={<Assignment color="primary" />}
              />
              <CardContent>
                <List dense>
                  {dashboardData.upcomingAssignments.map((assignment) => (
                    <ListItem key={assignment.id} disablePadding sx={{ mb: 1 }}>
                      <ListItemText
                        primary={assignment.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {assignment.course}
                            </Typography>
                            {` — Due: ${new Date(
                              assignment.dueDate
                            ).toLocaleDateString()}`}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() =>
                    (window.location.href =
                      "/student-dashboard/assignment-results")
                  }
                >
                  View All Assignments
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Announcements */}
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader
                title="Recent Announcements"
                avatar={<Notifications color="primary" />}
              />
              <CardContent>
                <List dense>
                  {dashboardData.recentAnnouncements.map((announcement) => (
                    <ListItem
                      key={announcement.id}
                      disablePadding
                      sx={{ mb: 1 }}
                    >
                      <ListItemText
                        primary={announcement.title}
                        secondary={`Posted: ${new Date(
                          announcement.date
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() =>
                    (window.location.href = "/student-dashboard/notifications")
                  }
                >
                  View All Announcements
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Events */}
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader
                title="Upcoming Events"
                avatar={<CalendarToday color="primary" />}
              />
              <CardContent>
                <List dense>
                  {dashboardData.upcomingEvents.map((event) => (
                    <ListItem key={event.id} disablePadding sx={{ mb: 1 }}>
                      <ListItemText
                        primary={event.title}
                        secondary={`Date: ${new Date(
                          event.date
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Enrolled Courses */}
          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <CardHeader
                title="My Courses"
                avatar={<Book color="primary" />}
              />
              <CardContent>
                <Grid container spacing={2}>
                  {dashboardData.enrolledCourses.map((course) => (
                    <Grid item xs={12} sm={6} key={course.id}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderLeft: "4px solid",
                          borderColor: "primary.main",
                          height: "100%",
                        }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          {course.code}: {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Instructor: {course.instructor}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() =>
                    (window.location.href = "/student-dashboard/my-courses")
                  }
                >
                  View All Courses
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default StudentHome;
