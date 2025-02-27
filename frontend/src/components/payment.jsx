"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Container, Typography, TextField, Button, Box, Grid, MenuItem } from "@mui/material"

const Payment = () => {
  const location = useLocation()
  const { formData } = location.state || {}

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically process the payment
    console.log("Form Data:", formData)
    console.log("Payment Data:", paymentData)
    // After successful payment, you can redirect to a confirmation page
    // navigate('/confirmation');
  }

  const paymentMethods = [
    { value: "creditCard", label: "Credit Card" },
    { value: "debitCard", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
  ]

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Payment Information
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                id="paymentMethod"
                label="Payment Method"
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handleChange}
              >
                {paymentMethods.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cardNumber"
                label="Card Number"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="expiryDate"
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="cvv"
                label="CVV"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Complete Payment
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Payment

