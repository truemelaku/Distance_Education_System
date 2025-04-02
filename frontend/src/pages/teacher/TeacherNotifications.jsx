import React,{ useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';

// Mock notification data (replace with API call later)
const initialNotifications = [
  { id: 1, content: 'New assignment submitted by Student A', timestamp: '2025-03-30 09:00', read: false },
  { id: 2, content: 'Grades due by Friday', timestamp: '2025-03-29 12:00', read: true },
];

const TeacherNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    // Later, add an API call to update the notification status
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notifications ({unreadCount} unread)
      </Typography>

      {/* Notification List */}
      <List>
        {notifications.map((notif) => (
          <React.Fragment key={notif.id}>
            <ListItem
              sx={{
                backgroundColor: notif.read ? 'inherit' : '#f5f5f5',
                borderLeft: notif.read ? 'none' : '4px solid #1976d2',
              }}
            >
              <ListItemText
                primary={notif.content}
                secondary={notif.timestamp}
              />
              {!notif.read && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  Mark as Read
                </Button>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TeacherNotifications;