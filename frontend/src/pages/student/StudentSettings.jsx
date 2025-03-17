"use client"

import { useState } from "react"
import { Typography, Paper, Switch, FormControlLabel, Button, TextField, Grid } from "@mui/material"

const StudentSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: "English",
    timezone: "UTC",
  })

  const handleChange = (event) => {
    const { name, value, checked } = event.target
    setSettings({
      ...settings,
      [name]: value !== undefined ? value : checked,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the updated settings to your backend
    console.log("Updated settings:", settings)
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  name="emailNotifications"
                  color="primary"
                />
              }
              label="Email Notifications"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={settings.darkMode} onChange={handleChange} name="darkMode" color="primary" />}
              label="Dark Mode"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Language"
              name="language"
              value={settings.language}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Timezone"
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </TextField>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Settings
        </Button>
      </form>
    </Paper>
  )
}

export default StudentSettings

