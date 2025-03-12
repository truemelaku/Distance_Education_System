"use client"

import { useState } from "react"
import { Box, Typography, Paper, TextField, Button, Checkbox, FormControlLabel, Grid } from "@mui/material"

const NotifyTeachers = () => {
  const [message, setMessage] = useState("")
  const [sendToAll, setSendToAll] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would implement the logic to send the notification
    console.log("Notification sent:", { message, sendToAll })
    setMessage("")
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notify Teachers
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notification Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={sendToAll} onChange={(e) => setSendToAll(e.target.checked)} name="sendToAll" />
                }
                label="Send to all teachers"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Send Notification
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default NotifyTeachers

