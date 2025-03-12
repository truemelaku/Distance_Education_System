"use client"

import { useState } from "react"
import { Box, Typography, Paper, Grid, TextField, Button, Avatar, Divider, IconButton } from "@mui/material"
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material"

const AdminProfile = () => {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "admin@educonnect.com",
    phone: "+1 (555) 123-4567",
    role: "System Administrator",
    department: "IT Department",
    joinDate: "01/15/2020",
    bio: "Experienced education administrator with over 10 years in academic management and technology integration.",
  })

  const [editedProfile, setEditedProfile] = useState({ ...profile })

  const handleEdit = () => {
    setEditing(true)
    setEditedProfile({ ...profile })
  }

  const handleCancel = () => {
    setEditing(false)
  }

  const handleSave = () => {
    setProfile({ ...editedProfile })
    setEditing(false)
    // Here you would typically send the updated profile to your backend
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Profile
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar src="/static/images/avatar/1.jpg" alt={profile.name} sx={{ width: 150, height: 150, mb: 2 }} />
            <Typography variant="h6">{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.department}
            </Typography>

            {!editing && (
              <Button variant="outlined" startIcon={<EditIcon />} sx={{ mt: 2 }} onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Personal Information</Typography>
              {editing && (
                <Box>
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                {editing ? (
                  <TextField
                    fullWidth
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                    margin="dense"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{profile.name}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                {editing ? (
                  <TextField
                    fullWidth
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                    margin="dense"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{profile.email}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                {editing ? (
                  <TextField
                    fullWidth
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleChange}
                    margin="dense"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{profile.phone}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Join Date
                </Typography>
                <Typography variant="body1">{profile.joinDate}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Bio
                </Typography>
                {editing ? (
                  <TextField
                    fullWidth
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleChange}
                    margin="dense"
                    size="small"
                    multiline
                    rows={4}
                  />
                ) : (
                  <Typography variant="body1">{profile.bio}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Account Security
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              Change Password
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              Two-Factor Authentication
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default AdminProfile

