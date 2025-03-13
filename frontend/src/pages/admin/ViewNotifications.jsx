import { Box, Typography, Paper, List, ListItem, ListItemText, Chip } from "@mui/material"

const ViewNotifications = () => {
  const notifications = [
    { id: 1, message: "New course materials uploaded for CS101", date: "2023-09-15", type: "Course Update" },
    { id: 2, message: "Reminder: Faculty meeting tomorrow at 2 PM", date: "2023-09-16", type: "Meeting" },
    { id: 3, message: "Grades for CS201 midterm exam are now available", date: "2023-09-17", type: "Grades" },
    { id: 4, message: "System maintenance scheduled for this weekend", date: "2023-09-18", type: "System" },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        View Notifications
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} divider>
              <ListItemText primary={notification.message} secondary={notification.date} />
              <Chip label={notification.type} size="small" />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default ViewNotifications

