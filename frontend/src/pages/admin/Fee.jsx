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
    Chip,
  } from "@mui/material"
  
  const Fee = () => {
    const feeRecords = [
      { id: 1, student: "John Doe", course: "CS101", amount: 1000, status: "Paid", dueDate: "2023-09-30" },
      { id: 2, student: "Jane Smith", course: "CS201", amount: 1200, status: "Pending", dueDate: "2023-10-15" },
      { id: 3, student: "Bob Johnson", course: "CS301", amount: 1500, status: "Overdue", dueDate: "2023-09-15" },
      { id: 4, student: "Alice Brown", course: "CS401", amount: 1800, status: "Paid", dueDate: "2023-09-30" },
    ]
  
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Fee Management
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feeRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.student}</TableCell>
                    <TableCell>{record.course}</TableCell>
                    <TableCell>${record.amount}</TableCell>
                    <TableCell>{record.dueDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        color={record.status === "Paid" ? "success" : record.status === "Pending" ? "warning" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">
                        {record.status === "Paid" ? "View Receipt" : "Send Reminder"}
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
  
  export default Fee
  
  