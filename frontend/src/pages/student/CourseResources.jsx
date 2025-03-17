"use client"

import { useState } from "react"
import { Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material"
import LiveClass from "./LiveClass" // Adjust the path as necessary
import DiscussionForum from "./DiscussionForum" // Adjust the path as necessary

const CourseResources = () => {
  const [selectedResource, setSelectedResource] = useState(null)

  const handleResourceClick = (resource) => {
    setSelectedResource(resource)
  }

  const renderContent = () => {
    switch (selectedResource) {
      case "syllabus": {
        return <Typography>This is the course syllabus...</Typography>
      }
      case "lectures": {
        const lecturesList = [
          { id: 1, title: "Introduction to the Course" },
          { id: 2, title: "Basic Concepts" },
          // Add more lectures as needed
        ]
        return (
          <List>
            {lecturesList.map((lecture) => (
              <ListItem key={lecture.id}>
                <ListItemText primary={lecture.title} />
              </ListItem>
            ))}
          </List>
        )
      }
      case "assignments": {
        const assignmentsList = [
          { id: 1, title: "Assignment 1", dueDate: "2023-07-15" },
          { id: 2, title: "Assignment 2", dueDate: "2023-07-30" },
          // Add more assignments as needed
        ]
        return (
          <List>
            {assignmentsList.map((assignment) => (
              <ListItem key={assignment.id}>
                <ListItemText primary={assignment.title} secondary={`Due: ${assignment.dueDate}`} />
              </ListItem>
            ))}
          </List>
        )
      }
      case "liveClass": {
        return <LiveClass />
      }
      case "discussionForum": {
        return <DiscussionForum />
      }
      default:
        return <Typography>Select a resource to view its content.</Typography>
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Course Resources
      </Typography>
      <Box>
        <Button onClick={() => handleResourceClick("syllabus")}>Syllabus</Button>
        <Button onClick={() => handleResourceClick("lectures")}>Lectures</Button>
        <Button onClick={() => handleResourceClick("assignments")}>Assignments</Button>
        <Button onClick={() => handleResourceClick("liveClass")}>Live Class</Button>
        <Button onClick={() => handleResourceClick("discussionForum")}>Discussion Forum</Button>
      </Box>
      <Box mt={2}>{renderContent()}</Box>
    </Box>
  )
}

export default CourseResources

