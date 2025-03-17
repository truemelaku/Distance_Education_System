import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
  } from "@mui/material"
  
  const CourseAllocation = () => {
    const allocations = [
      { id: 1, course: "CS101", instructor: "Dr. Smith", students: 120, status: "Allocated" },
      { id: 2, course: "CS201", instructor: "Dr. Johnson", students: 95, status: "Pending" },
      { id: 3, course: "CS301", instructor: "Dr. Williams", students: 50, status: "Allocated" },
    ]
  
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Course Allocation
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell>Students Enrolled</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocations.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell>{allocation.course}</TableCell>
                    <TableCell>{allocation.instructor}</TableCell>
                    <TableCell>{allocation.students}</TableCell>
                    <TableCell>{allocation.status}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">
                        {allocation.status === "Allocated" ? "Modify" : "Allocate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    )
  }
  
  export default CourseAllocation
  
  