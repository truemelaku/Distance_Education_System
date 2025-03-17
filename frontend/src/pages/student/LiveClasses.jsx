"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material"
import { VideoLibrary, Videocam, PeopleAlt, Schedule, PlayArrow, OpenInNew } from "@mui/icons-material"

const LiveClasses = () => {
  const [classes, setClasses] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
          setClasses({
            upcoming: [
              {
                id: 1,
                title: "Database Design Principles",
                course: "CS301: Database Systems",
                instructor: "Dr. Smith",
                time: "2023-11-15T14:30:00",
                duration: 60,
                platform: "Zoom",
                link: "https://zoom.us/j/123456789",
                description: "We'll cover normalization techniques and entity-relationship modeling.",
              },
              {
                id: 2,
                title: "Tree Traversal Algorithms",
                course: "CS302: Data Structures",
                instructor: "Prof. Johnson",
                time: "2023-11-16T10:00:00",
                duration: 90,
                platform: "Google Meet",
                link: "https://meet.google.com/abc-defg-hij",
                description: "Discussion on pre-order, in-order, and post-order traversal techniques.",
              },
            ],
            recorded: [
              {
                id: 3,
                title: "Introduction to SQL",
                course: "CS301: Database Systems",
                instructor: "Dr. Smith",
                recordedDate: "2023-11-08",
                duration: 75,
                views: 42,
                link: "https://example.com/videos/sql-intro",
                thumbnail: "/placeholder.svg?height=60&width=120",
              },
              {
                id: 4,
                title: "Linked Lists Implementation",
                course: "CS302: Data Structures",
                instructor: "Prof. Johnson",
                recordedDate: "2023-11-05",
                duration: 65,
                views: 38,
                link: "https://example.com/videos/linked-lists",
                thumbnail: "/placeholder.svg?height=60&width=120",
              },
              {
                id: 5,
                title: "UI Design Principles",
                course: "CS303: Human-Computer Interaction",
                instructor: "Dr. Williams",
                recordedDate: "2023-11-03",
                duration: 80,
                views: 51,
                link: "https://example.com/videos/ui-design",
                thumbnail: "/placeholder.svg?height=60&width=120",
              },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Error fetching live classes:", err)
        setError("Failed to load live class data. Please try again later.")
        setLoading(false)
      }
    }

    fetchLiveClasses()
  }, [])

  if (loading && !classes) {
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

  // Format time from ISO string
  const formatTime = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Format duration in minutes to hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  // Calculate time until class begins
  const getTimeUntil = (isoString) => {
    const now = new Date()
    const classTime = new Date(isoString)
    const diffMs = classTime - now
    if (diffMs < 0) return "Started"

    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 60) return `${diffMins}m`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m`

    return `${Math.floor(diffHours / 24)}d`
  }

  return (
    <Box sx={{ p: 3 }}>
      {classes && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <VideoLibrary fontSize="large" color="primary" sx={{ mr: 2 }} />
            <Typography variant="h4">Live Classes</Typography>
          </Box>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Upcoming Live Classes
          </Typography>
          <Grid container spacing={3}>
            {classes.upcoming.map((cls) => (
              <Grid item xs={12} md={6} key={cls.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {cls.title}
                      </Typography>
                      <Chip icon={<Videocam />} label={cls.platform} color="primary" size="small" />
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      {cls.course}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: "primary.main" }}>
                        {cls.instructor.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{cls.instructor}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Schedule sx={{ fontSize: 20, mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2">
                        {formatTime(cls.time)} ({formatDuration(cls.duration)})
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PeopleAlt sx={{ fontSize: 20, mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2">Expected participants: 25+</Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {cls.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                    <Chip label={`Starts in: ${getTimeUntil(cls.time)}`} color="secondary" variant="outlined" />
                    <Button
                      variant="contained"
                      startIcon={<OpenInNew />}
                      href={cls.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Class
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            Recorded Classes
          </Typography>
          <Grid container spacing={3}>
            {classes.recorded.map((rec) => (
              <Grid item xs={12} sm={6} md={4} key={rec.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      position: "relative",
                      height: 160,
                      backgroundImage: `url(${rec.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      sx={{ zIndex: 1 }}
                      href={rec.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch
                    </Button>
                    <Chip
                      label={formatDuration(rec.duration)}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.7)",
                        color: "white",
                        zIndex: 1,
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {rec.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {rec.course}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: "primary.main" }}>
                        {rec.instructor.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{rec.instructor}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", p: 2, mt: "auto" }}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(rec.recordedDate).toLocaleDateString()} • {rec.views} views
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default LiveClasses

