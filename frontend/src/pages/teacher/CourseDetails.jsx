"use client"

import { useState } from "react"
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material"
import { CloudUpload, Delete, Download, Facebook, Twitter, LinkedIn } from "@mui/icons-material"
import { useParams } from "react-router-dom"

function CourseDetails() {
  const { id } = useParams()
  const [videos, setVideos] = useState([
    { id: 1, name: "Lecture 1", uploadDate: "2023-05-01" },
    { id: 2, name: "Lecture 2", uploadDate: "2023-05-08" },
  ])
  const [files, setFiles] = useState([
    { id: 1, name: "Syllabus.pdf", uploadDate: "2023-04-15" },
    { id: 2, name: "Assignment1.docx", uploadDate: "2023-05-05" },
  ])

  const handleUpload = (type) => {
    // Implement file upload logic here
    console.log(`Uploading ${type}`)
  }

  const handleDownload = (item) => {
    // Implement file download logic here
    console.log(`Downloading ${item.name}`)
  }

  const handleDelete = (type, id) => {
    // Implement delete logic here
    if (type === "video") {
      setVideos(videos.filter((video) => video.id !== id))
    } else {
      setFiles(files.filter((file) => file.id !== id))
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Course Details: {id}
      </Typography>

      {/* Videos Table */}
      <Typography variant="h5" gutterBottom>
        Videos
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>{video.name}</TableCell>
                <TableCell>{video.uploadDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDownload(video)}>
                    <Download />
                  </IconButton>
                  <IconButton onClick={() => handleDelete("video", video.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" startIcon={<CloudUpload />} onClick={() => handleUpload("video")}>
        Upload Video
      </Button>

      {/* Files Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Files
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.uploadDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDownload(file)}>
                    <Download />
                  </IconButton>
                  <IconButton onClick={() => handleDelete("file", file.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" startIcon={<CloudUpload />} onClick={() => handleUpload("file")}>
        Upload File
      </Button>

      {/* Instructor Profile */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Avatar alt="Instructor Name" src="/placeholder.svg" sx={{ width: 100, height: 100, margin: "0 auto" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Instructor Name
        </Typography>
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <IconButton color="primary" aria-label="facebook">
              <Facebook />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="twitter">
              <Twitter />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="linkedin">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CourseDetails

