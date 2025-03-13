"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Divider,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material"
import { Forum, Message, ThumbUp, ThumbUpOutlined, CommentOutlined, Add, Send, Search } from "@mui/icons-material"

const DiscussionForums = () => {
  const [discussions, setDiscussions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [commentDialog, setCommentDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
          setDiscussions({
            courses: [
              {
                id: 1,
                name: "Database Systems",
                code: "CS301",
                postCount: 24,
                recentActivity: "2023-11-14T10:30:00",
                posts: [
                  {
                    id: 101,
                    title: "Help with SQL Queries",
                    author: "Jane Smith",
                    authorAvatar: null,
                    date: "2023-11-14T09:45:00",
                    content:
                      "I'm having trouble with complex joins in my SQL homework. Can someone explain how to properly structure a three-table join with constraints?",
                    likes: 5,
                    comments: [
                      {
                        id: 1001,
                        author: "Prof. Johnson",
                        authorAvatar: null,
                        date: "2023-11-14T10:15:00",
                        content:
                          "Try thinking about the relationships between tables first. Start with your primary table, then JOIN each additional table with the appropriate ON conditions.",
                      },
                      {
                        id: 1002,
                        author: "Michael Lee",
                        authorAvatar: null,
                        date: "2023-11-14T10:30:00",
                        content:
                          "Here's an example: SELECT a.*, b.*, c.* FROM table_a a JOIN table_b b ON a.id = b.a_id JOIN table_c c ON b.id = c.b_id WHERE a.column = 'value';",
                      },
                    ],
                  },
                  {
                    id: 102,
                    title: "Database Normalization Question",
                    author: "Alex Johnson",
                    authorAvatar: null,
                    date: "2023-11-13T14:20:00",
                    content: "Can someone explain the difference between 2NF and 3NF with real-world examples?",
                    likes: 8,
                    comments: [
                      {
                        id: 1003,
                        author: "Dr. Smith",
                        authorAvatar: null,
                        date: "2023-11-13T15:05:00",
                        content:
                          "2NF removes partial dependencies - when a non-key attribute depends on part of a composite key. 3NF removes transitive dependencies - when a non-key attribute depends on another non-key attribute.",
                      },
                    ],
                  },
                ],
              },
              {
                id: 2,
                name: "Data Structures",
                code: "CS302",
                postCount: 18,
                recentActivity: "2023-11-13T16:45:00",
                posts: [
                  {
                    id: 103,
                    title: "Tree Traversal Implementation",
                    author: "Mark Wilson",
                    authorAvatar: null,
                    date: "2023-11-13T16:45:00",
                    content:
                      "I'm struggling with implementing a non-recursive in-order traversal for binary trees. Any tips?",
                    likes: 3,
                    comments: [
                      {
                        id: 1004,
                        author: "Linda Chen",
                        authorAvatar: null,
                        date: "2023-11-13T17:10:00",
                        content:
                          "You need to use a stack to simulate the recursion. Push nodes as you go left, then process and go right when you can't go left anymore.",
                      },
                    ],
                  },
                ],
              },
            ],
            general: [
              {
                id: 3,
                name: "Campus Events",
                postCount: 12,
                recentActivity: "2023-11-12T11:20:00",
                posts: [
                  {
                    id: 104,
                    title: "Upcoming Tech Career Fair",
                    author: "Career Services",
                    authorAvatar: null,
                    date: "2023-11-12T11:20:00",
                    content:
                      "Don't miss our annual Tech Career Fair on Nov 25th. Over 30 companies will be attending, including Google, Microsoft, and Amazon.",
                    likes: 15,
                    comments: [
                      {
                        id: 1005,
                        author: "Sarah Miller",
                        authorAvatar: null,
                        date: "2023-11-12T13:45:00",
                        content: "Will there be opportunities for internships or only full-time positions?",
                      },
                      {
                        id: 1006,
                        author: "Career Services",
                        authorAvatar: null,
                        date: "2023-11-12T14:30:00",
                        content:
                          "Hi Sarah, yes there will be plenty of internship opportunities! Many companies are specifically looking for interns.",
                      },
                    ],
                  },
                ],
              },
              {
                id: 4,
                name: "Technical Support",
                postCount: 8,
                recentActivity: "2023-11-10T09:15:00",
                posts: [
                  {
                    id: 105,
                    title: "Issues accessing online library resources",
                    author: "John Doe",
                    authorAvatar: null,
                    date: "2023-11-10T09:15:00",
                    content:
                      "I'm having trouble accessing the IEEE and ACM digital libraries from off-campus. Has anyone else experienced this issue?",
                    likes: 4,
                    comments: [
                      {
                        id: 1007,
                        author: "IT Support",
                        authorAvatar: null,
                        date: "2023-11-10T10:00:00",
                        content:
                          "Hi John, please make sure you're connected to the VPN before accessing these resources. If the problem persists, email support@university.edu.",
                      },
                    ],
                  },
                ],
              },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Error fetching discussions:", err)
        setError("Failed to load discussion forums. Please try again later.")
        setLoading(false)
      }
    }

    fetchDiscussions()
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleCommentOpen = (post) => {
    setSelectedPost(post)
    setCommentDialog(true)
  }

  const handleCommentClose = () => {
    setCommentDialog(false)
    setNewComment("")
  }

  const handleAddComment = () => {
    if (newComment.trim() === "") return

    // In a real app, you would send this to your API
    const comment = {
      id: Date.now(),
      author: "You (John Doe)",
      authorAvatar: null,
      date: new Date().toISOString(),
      content: newComment,
    }

    // Update the UI optimistically
    const updatedDiscussions = { ...discussions }

    // Find the forum and post to update
    let found = false

    // Function to search in a forum category
    const searchInCategory = (category) => {
      for (const forum of updatedDiscussions[category]) {
        for (const post of forum.posts) {
          if (post.id === selectedPost.id) {
            post.comments.push(comment)
            found = true
            break
          }
        }
        if (found) break
      }
    }

    // Search in both categories
    searchInCategory("courses")
    if (!found) searchInCategory("general")

    setDiscussions(updatedDiscussions)
    setNewComment("")
    setCommentDialog(false)
  }

  const handleLikePost = (postId) => {
    // Update the UI optimistically
    const updatedDiscussions = { ...discussions }

    // Find the post to update
    let found = false

    // Function to search in a forum category
    const searchInCategory = (category) => {
      for (const forum of updatedDiscussions[category]) {
        for (const post of forum.posts) {
          if (post.id === postId) {
            post.likes = post.liked ? post.likes - 1 : post.likes + 1
            post.liked = !post.liked
            found = true
            break
          }
        }
        if (found) break
      }
    }

    // Search in both categories
    searchInCategory("courses")
    if (!found) searchInCategory("general")

    setDiscussions(updatedDiscussions)
  }

  // Format date from ISO string
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Filter posts based on search query
  const filterPosts = (posts) => {
    if (!searchQuery.trim()) return posts

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  if (loading && !discussions) {
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
      {discussions && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Forum fontSize="large" color="primary" sx={{ mr: 2 }} />
            <Typography variant="h4">Discussion Forums</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Course Forums" />
              <Tab label="General Forums" />
            </Tabs>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ width: 250 }}
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  /* Handle creating new discussion */
                }}
              >
                New Discussion
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {tabValue === 0 && (
            <Grid container spacing={3}>
              {discussions.courses.map((forum) => (
                <Grid item xs={12} key={forum.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {forum.code}: {forum.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {forum.postCount} discussions • Last activity: {formatDate(forum.recentActivity)}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <List>
                        {filterPosts(forum.posts).map((post) => (
                          <Paper key={post.id} elevation={1} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                            <Typography variant="h6">{post.title}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 1 }}>
                              <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{post.author.charAt(0)}</Avatar>
                              <Typography variant="body2" color="text.secondary">
                                {post.author} • {formatDate(post.date)}
                              </Typography>
                            </Box>
                            <Typography variant="body1" paragraph>
                              {post.content}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Box>
                                <IconButton
                                  size="small"
                                  onClick={() => handleLikePost(post.id)}
                                  color={post.liked ? "primary" : "default"}
                                >
                                  {post.liked ? <ThumbUp /> : <ThumbUpOutlined />}
                                </IconButton>
                                <Typography variant="body2" color="text.secondary" component="span" sx={{ mr: 2 }}>
                                  {post.likes}
                                </Typography>
                                <IconButton size="small" onClick={() => handleCommentOpen(post)}>
                                  <CommentOutlined />
                                </IconButton>
                                <Typography variant="body2" color="text.secondary" component="span">
                                  {post.comments.length}
                                </Typography>
                              </Box>
                              <Button variant="text" endIcon={<Message />} onClick={() => handleCommentOpen(post)}>
                                View Discussion
                              </Button>
                            </Box>
                          </Paper>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              {discussions.general.map((forum) => (
                <Grid item xs={12} md={6} key={forum.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {forum.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {forum.postCount} discussions • Last activity: {formatDate(forum.recentActivity)}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <List>
                        {filterPosts(forum.posts).map((post) => (
                          <Paper key={post.id} elevation={1} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                            <Typography variant="h6">{post.title}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 1 }}>
                              <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{post.author.charAt(0)}</Avatar>
                              <Typography variant="body2" color="text.secondary">
                                {post.author} • {formatDate(post.date)}
                              </Typography>
                            </Box>
                            <Typography variant="body1" paragraph>
                              {post.content}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Box>
                                <IconButton
                                  size="small"
                                  onClick={() => handleLikePost(post.id)}
                                  color={post.liked ? "primary" : "default"}
                                >
                                  {post.liked ? <ThumbUp /> : <ThumbUpOutlined />}
                                </IconButton>
                                <Typography variant="body2" color="text.secondary" component="span" sx={{ mr: 2 }}>
                                  {post.likes}
                                </Typography>
                                <IconButton size="small" onClick={() => handleCommentOpen(post)}>
                                  <CommentOutlined />
                                </IconButton>
                                <Typography variant="body2" color="text.secondary" component="span">
                                  {post.comments.length}
                                </Typography>
                              </Box>
                              <Button variant="text" endIcon={<Message />} onClick={() => handleCommentOpen(post)}>
                                View Discussion
                              </Button>
                            </Box>
                          </Paper>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Comment Dialog */}
          <Dialog open={commentDialog} onClose={handleCommentClose} fullWidth maxWidth="md">
            {selectedPost && (
              <>
                <DialogTitle>
                  <Typography variant="h6">{selectedPost.title}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{selectedPost.author.charAt(0)}</Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPost.author} • {formatDate(selectedPost.date)}
                    </Typography>
                  </Box>
                </DialogTitle>
                <DialogContent dividers>
                  <Typography variant="body1" paragraph>
                    {selectedPost.content}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Responses ({selectedPost.comments.length})
                  </Typography>

                  <List>
                    {selectedPost.comments.map((comment) => (
                      <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar>{comment.author.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="subtitle2">{comment.author}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(comment.date)}
                              </Typography>
                            </Box>
                          }
                          secondary={comment.content}
                          secondaryTypographyProps={{
                            variant: "body1",
                            color: "text.primary",
                            mt: 1,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </DialogContent>
                <DialogActions sx={{ p: 3, display: "flex", alignItems: "flex-start" }}>
                  <Avatar sx={{ mr: 2 }}>JD</Avatar>
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Add your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    sx={{ ml: 2 }}
                  >
                    Post
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </>
      )}
    </Box>
  )
}

export default DiscussionForums

