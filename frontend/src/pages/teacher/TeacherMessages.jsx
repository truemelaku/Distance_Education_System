import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Divider,
} from '@mui/material';

// Mock message data (replace with API call later)
const initialMessages = [
  { id: 1, sender: 'Student A', content: 'Can you review my assignment?', timestamp: '2025-03-30 10:00' },
  { id: 2, sender: 'Admin', content: 'Please submit grades by Friday.', timestamp: '2025-03-29 15:30' },
];

const TeacherMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'Me', // Teacher as sender
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage(''); // Clear input
      // Later, replace this with an API call to send the message
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>

      {/* Message List */}
      <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 3 }}>
        <List>
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              <ListItem>
                <ListItemText
                  primary={`${msg.sender}: ${msg.content}`}
                  secondary={msg.timestamp}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Compose Message */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          fullWidth
          multiline
          rows={2}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default TeacherMessages;