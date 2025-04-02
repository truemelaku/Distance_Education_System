"use client"
import { Box, Typography, Paper } from '@mui/material';

const TeacherSettings = () => (
  <Box sx={{ p: 3 }}>
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1">
        Adjust your account settings and preferences.
      </Typography>
    </Paper>
  </Box>
);

export default TeacherSettings;