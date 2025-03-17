"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material"
import { Edit, Save, Cancel, School, LocationOn, Phone, Email, CalendarToday, CloudUpload } from "@mui/icons-material"

const StudentProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        // In a real app, you would use the actual API call
        // const response = await studentApi.getProfile();
        // setProfile(response.data);

        // For demo purposes, we'll simulate an API response
        setTimeout(() => {
          setProfile({
            id: "12345",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "(555) 123-4567",
            dateOfBirth: "1998-05-15",
            address: {
              street: "123 University Ave",
              city: "College Town",
              state: "CA",
              zipCode: "90210",
              country: "USA",
            },
            program: "Bachelor of Science in Computer Science",
            enrollmentDate: "2020-09-01",
            expectedGraduation: "2024-05-30",
            studentId: "S20200123",
            academicStatus: "Good Standing",
            gpa: 3.75,
            completedCredits: 75,
            totalCredits: 120,
            advisor: "Dr. Jane Smith",
            emergencyContact: {
              name: "Mary Doe",
              relationship: "Mother",
              phone: "(555) 987-6543",
            },
            achievements: [
              { id: 1, title: "Dean's List", date: "2022-12-15", description: "Fall Semester 2022" },
              {
                id: 2,
                title: "Hackathon Winner",
                date: "2022-04-10",
                description: "First place in University Hackathon",
              },
              { id: 3, title: "Research Assistant", date: "2021-06-01", description: "AI Research Lab" },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Failed to load profile data. Please try again later.")
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        street: profile.address.street,
        city: profile.address.city,
        state: profile.address.state,
        zipCode: profile.address.zipCode,
        country: profile.address.country,
        emergencyContactName: profile.emergencyContact.name,
        emergencyContactRelationship: profile.emergencyContact.relationship,
        emergencyContactPhone: profile.emergencyContact.phone,
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      // In a real app, you would use the actual API call
      // const response = await studentApi.updateProfile({
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   email: formData.email,
      //   phone: formData.phone,
      //   address: {
      //     street: formData.street,
      //     city: formData.city,
      //     state: formData.state,
      //     zipCode: formData.zipCode,
      //     country: formData.country
      //   },
      //   emergencyContact: {
      //     name: formData.emergencyContactName,
      //     relationship: formData.emergencyContactRelationship,
      //     phone: formData.emergencyContactPhone
      //   }
      // });

      // For demo purposes, we'll simulate an API response
      setTimeout(() => {
        setProfile({
          ...profile,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
          emergencyContact: {
            name: formData.emergencyContactName,
            relationship: formData.emergencyContactRelationship,
            phone: formData.emergencyContactPhone,
          },
        })
        setEditing(false)
        setLoading(false)
        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        })
      }, 1000)
    } catch (err) {
      console.error("Error updating profile:", err)
      setLoading(false)
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      })
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  if (loading && !profile) {
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
      {profile && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                src="/student-avatar.png"
                alt={`${profile.firstName} ${profile.lastName}`}
                sx={{ width: 100, height: 100, mr: 3 }}
              />
              <Box>
                <Typography variant="h4">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Student ID: {profile.studentId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.program}
                </Typography>
              </Box>
              {!editing && (
                <Button variant="outlined" startIcon={<Edit />} sx={{ ml: "auto" }} onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </Box>

            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Personal Information" />
              <Tab label="Academic Information" />
              <Tab label="Achievements" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                {editing ? (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Street Address"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="State/Province"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Zip/Postal Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                          Emergency Contact
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Relationship"
                          name="emergencyContactRelationship"
                          value={formData.emergencyContactRelationship}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={handleChange}
                          margin="normal"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<Cancel />}
                            onClick={() => setEditing(false)}
                            disabled={loading}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            disabled={loading}
                          >
                            {loading ? <CircularProgress size={24} /> : "Save Changes"}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                ) : (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardHeader title="Contact Information" />
                        <CardContent>
                          <List>
                            <ListItem>
                              <ListItemText
                                primary="Email"
                                secondary={profile.email}
                                primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                                secondaryTypographyProps={{ variant: "body1" }}
                              />
                              <Email color="action" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Phone"
                                secondary={profile.phone}
                                primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                                secondaryTypographyProps={{ variant: "body1" }}
                              />
                              <Phone color="action" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Date of Birth"
                                secondary={new Date(profile.dateOfBirth).toLocaleDateString()}
                                primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                                secondaryTypographyProps={{ variant: "body1" }}
                              />
                              <CalendarToday color="action" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardHeader title="Address" />
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                            <LocationOn color="action" sx={{ mr: 1, mt: 0.5 }} />
                            <Typography variant="body1">
                              {profile.address.street}
                              <br />
                              {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                              <br />
                              {profile.address.country}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader title="Emergency Contact" />
                        <CardContent>
                          <List>
                            <ListItem>
                              <ListItemText
                                primary="Name"
                                secondary={profile.emergencyContact.name}
                                primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                                secondaryTypographyProps={{ variant: "body1" }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Relationship"
                                secondary={profile.emergencyContact.relationship}
                                primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                                secondaryTypographyProps={{ variant: "body1" }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Phone"
                                secondary={profile.emergencyContact.phone}
                                primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                                secondaryTypographyProps={{ variant: "body1" }}
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}

            {tabValue === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader title="Academic Information" />
                    <CardContent>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Program"
                            secondary={profile.program}
                            primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                            secondaryTypographyProps={{ variant: "body1" }}
                          />
                          <School color="action" />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Enrollment Date"
                            secondary={new Date(profile.enrollmentDate).toLocaleDateString()}
                            primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                            secondaryTypographyProps={{ variant: "body1" }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Expected Graduation"
                            secondary={new Date(profile.expectedGraduation).toLocaleDateString()}
                            primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                            secondaryTypographyProps={{ variant: "body1" }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Academic Status"
                            secondary={profile.academicStatus}
                            primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                            secondaryTypographyProps={{ variant: "body1" }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Academic Advisor"
                            secondary={profile.advisor}
                            primaryTypographyProps={{ variant: "subtitle2", color: "text.secondary" }}
                            secondaryTypographyProps={{ variant: "body1" }}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader title="Academic Progress" />
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Box sx={{ position: "relative", display: "inline-flex", mr: 3 }}>
                          <CircularProgress
                            variant="determinate"
                            value={(profile.completedCredits / profile.totalCredits) * 100}
                            size={100}
                            thickness={5}
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="caption" component="div" color="text.secondary">
                              {Math.round((profile.completedCredits / profile.totalCredits) * 100)}%
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Credits Completed
                          </Typography>
                          <Typography variant="h6">
                            {profile.completedCredits}/{profile.totalCredits}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Current GPA
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {profile.gpa.toFixed(2)}/4.00
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabValue === 2 && (
              <Card>
                <CardHeader
                  title="Achievements & Awards"
                  action={
                    <Button variant="outlined" size="small" startIcon={<CloudUpload />}>
                      Add New
                    </Button>
                  }
                />
                <CardContent>
                  <List>
                    {profile.achievements.map((achievement) => (
                      <ListItem key={achievement.id} divider>
                        <ListItemText
                          primary={achievement.title}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {achievement.description}
                              </Typography>
                              <br />
                              <Typography component="span" variant="caption" color="text.secondary">
                                Date: {new Date(achievement.date).toLocaleDateString()}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </Paper>
        </>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default StudentProfile

