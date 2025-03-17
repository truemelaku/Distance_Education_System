import { Box, Typography, Grid, Card, CardContent, CardHeader, Chip, Paper } from "@mui/material"
import { AccessTime as AccessTimeIcon } from "@mui/icons-material"

// Sample data for news and events
const newsAndEvents = [
  {
    type: "News",
    title: "Example Event",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a",
    timestamp: "19 minutes ago",
  },
  {
    type: "Event",
    title: "Example Event Updated",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a",
    timestamp: "3 hours, 48 minutes ago",
  },
  {
    type: "Event",
    title: "Example 3",
    content:
      "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    timestamp: "3 months, 4 weeks ago",
  },
  {
    type: "Event",
    title: "Final Exam Schedule",
    content:
      "final exam for all student will be at : August 2, 2020, 2:30 pm, you must be there at the above date and time, otherwise you may lose your final exam and that make you incomplete.",
    timestamp: "4 months ago",
  },
  {
    type: "News",
    title: "Example News",
    content: "the description or summary of this post is goes here...",
    timestamp: "4 months, 2 weeks ago",
  },
  {
    type: "Event",
    title: "Example Event",
    content:
      "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    timestamp: "4 months, 2 weeks ago",
  },
]

function NewsEventCard({ item }) {
  const isNews = item.type === "News"
  const headerColor = isNews ? "rgb(41, 171, 226)" : "rgb(149, 117, 205)"

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        sx={{
          bgcolor: headerColor,
          py: 1,
          "& .MuiCardHeader-content": { overflow: "hidden" },
        }}
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={item.type}
              size="small"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "0.75rem",
              }}
            />
            <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "medium" }}>
              {item.title}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {item.content}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon sx={{ fontSize: "0.875rem", color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {item.timestamp}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

function LecturerDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "grey.100",
        }}
      >
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Home
        </Typography>
      </Paper>

      {/* News & Events Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            color: "text.secondary",
            fontWeight: "medium",
          }}
        >
          NEWS & EVENTS
        </Typography>

        <Grid container spacing={3}>
          {newsAndEvents.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <NewsEventCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default LecturerDashboard

