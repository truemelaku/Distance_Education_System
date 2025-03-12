import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Payment from "./components/Payment"
import StudentDashboard from "./pages/StudentDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
//import Layout from "./components/Layout"
import Courses from "./pages/Courses"
import Profile from "./components/Profile";
import "./index.css"



const theme = createTheme({
  // You can customize your theme here
})

function App() {
  // This should come from your authentication system
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={< TeacherDashboard/>} />
          <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/courses" element={<Courses  />} />
            <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

