import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

function LecturerPrograms() {
  const programs = [
    {
      name: "Computer Science",
      courses: ["Introduction to Programming", "Data Structures", "Algorithms"],
    },
    {
      name: "Information Technology",
      courses: ["Web Development", "Network Security", "Database Management"],
    },
    {
      name: "Software Engineering",
      courses: ["Software Design", "Project Management", "Quality Assurance"],
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Programs & Courses
      </Typography>
      {programs.map((program, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{program.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {program.courses.map((course, courseIndex) => (
                <ListItem key={courseIndex}>
                  <ListItemText primary={course} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default LecturerPrograms

