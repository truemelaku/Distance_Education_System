"use client"

import { useState, useEffect, useRef } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  Badge,
  CircularProgress,
} from "@mui/material"
import { Send, Close, Chat as ChatIcon } from "@mui/icons-material"

const ChatComponent = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  // Fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        // In a real app, you would use the actual API call
        // const response = await studentApi.getMessages();
        // setMessages(response.data);

        // For demo purposes, we'll simulate an API response
        setTimeout(() => {
          setMessages([
            { id: 1, sender: "John Doe", text: "Hello, how can I help you today?", isAdmin: true, time: "10:30 AM" },
            {
              id: 2,
              sender: "You",
              text: "I have a question about my course registration",
              isAdmin: false,
              time: "10:32 AM",
            },
            { id: 3, sender: "John Doe", text: "Sure, what would you like to know?", isAdmin: true, time: "10:33 AM" },
          ])
          setUnreadCount(1)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching messages:", error)
        setLoading(false)
      }
    }

    fetchMessages()

    // Set up polling for new messages (in a real app)
    const interval = setInterval(() => {
      if (!open) {
        checkNewMessages()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Check for new messages
  const checkNewMessages = async () => {
    try {
      // In a real app, you would use the actual API call
      // const response = await studentApi.getNewMessageCount();
      // setUnreadCount(response.data.count);
      // For demo purposes, we'll simulate an API response
      // This would be replaced with actual API calls in a real application
    } catch (error) {
      console.error("Error checking new messages:", error)
    }
  }

  const handleSendMessage = async () => {
    if (message.trim() === "") return

    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: message,
      isAdmin: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessage("")
    setSending(true)

    try {
      // In a real app, you would use the actual API call
      // await studentApi.sendMessage(message);

      // For demo purposes, we'll simulate an API response
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: "John Doe",
          text: "Thanks for your message. An advisor will get back to you soon.",
          isAdmin: true,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, response])
        setSending(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setSending(false)
    }
  }

  const toggleChat = () => {
    setOpen(!open)
    if (!open) {
      setUnreadCount(0)
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Chat button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <IconButton
            color="primary"
            onClick={toggleChat}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              width: 56,
              height: 56,
            }}
          >
            <ChatIcon />
          </IconButton>
        </Badge>
      </Box>

      {/* Chat window */}
      {open && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 320,
            height: 450,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Chat header */}
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Support Chat</Typography>
            <IconButton size="small" onClick={toggleChat} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </Box>

          {/* Chat messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress size={30} />
              </Box>
            ) : (
              <List>
                {messages.map((msg) => (
                  <ListItem
                    key={msg.id}
                    alignItems="flex-start"
                    sx={{
                      flexDirection: msg.isAdmin ? "row" : "row-reverse",
                      mb: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={msg.sender}
                        src={msg.isAdmin ? "/admin-avatar.png" : "/student-avatar.png"}
                        sx={{ bgcolor: msg.isAdmin ? "primary.main" : "secondary.main" }}
                      >
                        {msg.sender.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: msg.isAdmin ? "flex-start" : "flex-end",
                        maxWidth: "70%",
                      }}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 1,
                          backgroundColor: msg.isAdmin ? "white" : "primary.light",
                          color: msg.isAdmin ? "text.primary" : "white",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body2">{msg.text}</Typography>
                      </Paper>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        {msg.time}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
                <div ref={messagesEndRef} />
              </List>
            )}
          </Box>

          {/* Chat input */}
          <Box
            sx={{
              p: 2,
              backgroundColor: "white",
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              disabled={sending}
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={sending ? <CircularProgress size={16} color="inherit" /> : <Send />}
              onClick={handleSendMessage}
              disabled={sending || message.trim() === ""}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </>
  )
}

export default ChatComponent

