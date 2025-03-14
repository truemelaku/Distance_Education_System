import React from "react"
import PropTypes from "prop-types"
import { Grid, Paper, Typography, Box } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import {
  PeopleAlt as PeopleIcon,
  School as SchoolIcon,
  MenuBook as BookIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material"

// Axios base URL setup to ensure it points to the backend
axios.defaults.baseURL = 'http://localhost:5000'; // Update with your backend URL if needed

const StatCard = ({ icon, title, value, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 2,
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 6,
      },
    }}
  >
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
        {value}
      </Typography>
    </Box>
    <Box
      sx={{
        backgroundColor: `${color}.light`,
        borderRadius: "50%",
        p: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 32, color: `${color}.main` } })}
    </Box>
  </Paper>
)

StatCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

const DashboardHome = () => {
  const [studentCount, setStudentCount] = useState(0)
  const [teacherCount, setTeacherCount] = useState(0)

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get("/api/students/count")
    
        setStudentCount(response.data.totalStudents || 0) // Ensure default if no data
      } catch (error) {
        console.error("Error fetching student count:", error)
      }
    }

    const fetchTeacherCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teachers/count");
        setTeacherCount(response.data.totalTeachers || 9000) // Ensure default if no data
      } catch (error) {
        console.error("Error fetching teacher count:", error)
      }
    }

    fetchStudentCount()
    fetchTeacherCount()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Students */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Total Students"
            value={studentCount !== undefined ? studentCount.toString() : "0"}
            color="primary"
          />
        </Grid>

        {/* Total Teachers */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<SchoolIcon />}
            title="Total Teachers"
            value={teacherCount !== undefined ? teacherCount.toString() : "0"}
            color="secondary"
          />
        </Grid>

        {/* Total Courses (Static for now) */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<BookIcon />} title="Total Courses" value="68" color="warning" />
        </Grid>

        {/* Revenue (Static for now) */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<MoneyIcon />} title="Revenue" value="$24,500" color="error" />
        </Grid>
      </Grid>

      {/* Recent Activities Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box
                  key={item}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Typography variant="body2">
                    <strong>Student {item}</strong> enrolled in <strong>Course {item + 10}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item} hour{item !== 1 ? "s" : ""} ago
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Upcoming Events Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Typography variant="body2">
                    <strong>Event {item}</strong>:{" "}
                    {item === 1 ? "Semester Registration" : item === 2 ? "Faculty Meeting" : "Exam Week"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(Date.now() + item * 86400000).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardHome
