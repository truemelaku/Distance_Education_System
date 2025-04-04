import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Payment from "./components/Payment";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
//import Layout from "./components/Layout"
import Courses from "./pages/Courses";
//import Profile from "./components/Profile";
import "./index.css";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Regisration from "./pages/Registration";
import LectureUpload from "./components/LectureUpload";

// This should come from your authentication system

const theme = createTheme({
  // You can customize your theme here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/studentDashboard/*" element={<StudentDashboard />} />

          <Route path="/StudentDashboard/*" element={<StudentDashboard />} />

          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/lectureUploading" element={<LectureUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Regisration />} />

          <Route path="/studentDashboard/*" element={<StudentDashboard />} />
          <Route path="/teacher/*" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/lectureUploading" element={<LectureUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Regisration />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
