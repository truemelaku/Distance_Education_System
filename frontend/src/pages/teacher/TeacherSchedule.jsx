import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// Mock schedule data (replace with API call later)
const initialSchedule = [
  { id: 1, day: 'Monday', time: '10:00 - 11:00', event: 'Math 101 Class' },
  { id: 2, day: 'Wednesday', time: '14:00 - 15:00', event: 'Science 202 Review' },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TeacherSchedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ day: '', time: '', event: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewEvent({ day: '', time: '', event: '' }); // Reset form
  };

  const handleAddEvent = () => {
    if (newEvent.day && newEvent.time && newEvent.event) {
      const eventToAdd = { id: schedule.length + 1, ...newEvent };
      setSchedule([...schedule, eventToAdd]);
      handleClose();
      // Later, replace this with an API call to save the event
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Schedule
      </Typography>

      {/* Schedule Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Event</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.event}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Event Button */}
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpen}>
        Add Event
      </Button>

      {/* Add Event Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Schedule Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Day"
            select
            SelectProps={{ native: true }}
            value={newEvent.day}
            onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          >
            <option value=""></option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </TextField>
          <TextField
            label="Time (e.g., 10:00 - 11:00)"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Event"
            value={newEvent.event}
            onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEvent} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherSchedule;