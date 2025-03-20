"use client"

import { useState, useRef } from "react"


import {Container,Typography,TextField,Button,Box, Paper,Avatar,InputAdornment,IconButton,FormControl,InputLabel,Select,MenuItem,Checkbox,FormControlLabel,
  Input,Grid,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import {
  LockOutlined,
  Email,
  Visibility,
  VisibilityOff,
  Home,
  Person,
  Phone,
  Wc,
  CloudUpload,
  School,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: 'url("/education-background.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  padding: theme.spacing(2),
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius * 2,
  position: "relative",
  overflow: "hidden",
  width: "100%",
  maxWidth: "500px",
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  width: theme.spacing(7),
  height: theme.spacing(7),
}))

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5, 0),
  fontSize: "1.1rem",
}))

const HomeButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
}))

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const fileInputRef = useRef()
  const showlogin=()=>{
    navigate('/login')
  }

  const [formData, setFormData] = useState({
    studentId: "",
    email: "",
    password: "",
    department: "",
    role: "student",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    agreement: false,
    certificate: null,
  });
  
  const [errors,setErrors]=useState("")
  const [verification,setVerification]=useState("")
const handleSignupSubmit=  async(e)=>{
  e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('firstName', formData.firstName);
    formDataObj.append('middleName', formData.middleName);
    formDataObj.append('lastName', formData.lastName);
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    formDataObj.append('department', formData.department);
    formDataObj.append('role', formData.role);
    formDataObj.append('gender', formData.gender);
    formDataObj.append('phoneNumber', formData.phoneNumber);
    formDataObj.append('agreement', formData.agreement);

    // Handle the certificate field (file input)
    if (formData.certificate) {
      formDataObj.append('certificate', formData.certificate);
    }

    try {
      const response = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      if (response.status === 201) {
        if (data.role === 'student') {
          // Store the studentId in localStorage only for students
          localStorage.setItem('studentId', data.studentId);
          
        }
  
        setVerification('Registration successful! Use this username to login: ' + data.studentId)
        setTimeout(() => {
          setVerification('');
          navigate('/login');
        }, 1000);
      } else if (response.status === 400) {
      
        
        setVerification(data.message)

      } else {
        setVerification('Registration failed:  ' + data.message)
      }
    } catch (error) {
      console.error('Error during registration:', error);
    
      setVerification('An error occurred during registration.')
      
    }
}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      certificate: e.target.files[0], // Assign the uploaded file
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <>
   
    <BackgroundBox>
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <HomeButton component={RouterLink} to="/" variant="outlined" startIcon={<Home />}>
            Back to Home
          </HomeButton>
          <StyledAvatar>
            <LockOutlined />
          </StyledAvatar>

          <AnimatePresence mode="wait">
            <motion.div
    
            >
              <Form onSubmit={handleSignupSubmit}>
              
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="firstName"
                        required
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="middleName"
                        required
                        label="Middle Name"
                        value={formData.middleName}
                        onChange={handleChange}
                        error={!!errors.middleName}
                        helperText={errors.middleName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel>Department</InputLabel>
                        <Select
                          required
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          label="Department"
                          startAdornment={
                            <InputAdornment position="start">
                              <School />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="computer engineering">computer engineering</MenuItem>
                          <MenuItem value="electrical engineering">electrical engineering</MenuItem>
                          <MenuItem value="electrical engineering">Software engineering</MenuItem>
                          <MenuItem value="electrical engineering">information system</MenuItem>
                          <MenuItem value="electrical engineering">cyber security</MenuItem>
                          <MenuItem value="electrical engineering">information technology</MenuItem>
                        </Select>
                        {errors.gender && (
                          <Typography color="error" variant="caption">
                            {errors.department}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          required
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          label="Gender"
                          startAdornment={
                            <InputAdornment position="start">
                              <Wc />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                        {errors.gender && (
                          <Typography color="error" variant="caption">
                            {errors.gender}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
              
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        name="phoneNumber"
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <Input
                          type="file"
                          name="certificate"
                          inputRef={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          inputProps={{ accept: "application/pdf, image/*" }}
                        />
                        <Button
                          variant="outlined"
                          onClick={handleFileButtonClick}
                          fullWidth
                          startIcon={<CloudUpload />}
                          sx={{ py: 1.5 }}
                        >
                          Upload Certificate (PDF/PHOTO)
                        </Button>
                        {formData.certificate && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            File selected: {formData.certificate.name}
                          </Typography>
                        )}
                        {errors.certificate && (
                          <Typography color="error" variant="caption">
                            {errors.certificate}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
        
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"

                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
             
                  <FormControlLabel
                    control={
                      <Checkbox checked={formData.agreement} onChange={handleChange} name="agreement" color="primary" />
                    }
                    label="I agree to the terms and conditions"
                  />
              
                
                  <Typography color="error" variant="caption" display="block">
                    {errors.agreement}
                  </Typography>
          
                <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                  Sign Up
                </SubmitButton>
              </Form>
              <SubmitButton type="submit" fullWidth variant="contained" color="primary" onClick={showlogin}>
                  login
                </SubmitButton>
            </motion.div>
          </AnimatePresence>
          <Box mt={2}>

          </Box>
        </StyledPaper>
        
      </Container>
      
    </BackgroundBox>
    <Box className="absolute top-1/4 left-1/2 transform -translate-x-1/2 p-4 w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3">
  {/* Tailwind width for responsiveness */}
  <div  className="w-full p-4 rounded-lg  fs-30 text-green-800 text-2xl">
    {verification}
  </div>
</Box>

    </>
  );
  
  }

export default Auth