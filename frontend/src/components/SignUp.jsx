"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    documentType: "",
    course: "",
    agreeToTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event) => {
    const { name, value, checked } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "agreeToTerms" ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically validate the form and send the data to your backend
    console.log(formData)
    // After successful validation, redirect to the payment page
    navigate("/payment", { state: { formData } })
  }

  const documentTypes = [
    { value: "passport", label: "Passport" },
    { value: "driverLicense", label: "Driver's License" },
    { value: "studentId", label: "Student ID" },
  ]

  const courses = [
    { value: "webDev", label: "Web Development" },
    { value: "dataScience", label: "Data Science" },
    { value: "digitalMarketing", label: "Digital Marketing" },
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
          Student Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="dateOfBirth"
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                id="documentType"
                label="Document Type"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
              >
                {documentTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Document
                <input type="file" hidden accept=".pdf,.jpg,.png" />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                id="course"
                label="Select Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
              >
                {courses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeToTerms"
                    color="primary"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                }
                label="I agree to the terms and conditions"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Proceed to Payment
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp

