"use client"

import { useState } from "react"
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New assignment posted in Math class", date: "2023-06-01", read: false },
    { id: 2, message: "Reminder: Exam next week", date: "2023-05-30", read: true },
    { id: 3, message: "Your grade for Physics quiz is now available", date: "2023-05-28", read: false },
    { id: 4, message: "New course materials uploaded", date: "2023-05-25", read: true },
  ])

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem
            key={notification.id}
            alignItems="flex-start"
            sx={{
              bgcolor: notification.read ? "transparent" : "action.hover",
              "&:hover": { bgcolor: "action.selected" },
            }}
          >
            <ListItemText
              primary={notification.message}
              secondary={notification.date}
              onClick={() => handleMarkAsRead(notification.id)}
              sx={{ cursor: "pointer" }}
            />
            <ListItemSecondaryAction>
              {!notification.read && <Chip label="New" color="primary" size="small" sx={{ mr: 1 }} />}
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(notification.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default StudentNotifications

