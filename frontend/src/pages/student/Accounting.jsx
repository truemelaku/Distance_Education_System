import {
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

const Accounting = () => {
  const transactions = [
    { id: 1, date: "2023-05-01", description: "Tuition Fee", amount: -5000, balance: 5000 },
    { id: 2, date: "2023-05-15", description: "Scholarship", amount: 2000, balance: 3000 },
    { id: 3, date: "2023-06-01", description: "Library Fine", amount: -20, balance: 3020 },
    { id: 4, date: "2023-06-15", description: "Payment", amount: -1000, balance: 2020 },
  ]

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Accounting
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell component="th" scope="row">
                  {transaction.date}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align="right" sx={{ color: transaction.amount < 0 ? "error.main" : "success.main" }}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell align="right">${transaction.balance.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Make a Payment
      </Button>
    </Paper>
  )
}

export default Accounting

