import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import AdminLayout from "./layouts/AdminLayout"
import LecturerLayout from "./layouts/LecturerLayout"
import Dashboard from "./pages/admin/Dashboard"
import Profile from "./pages/admin/Profile"
import LecturerHome from "./pages/lecturer/LecturerHome"
import LecturerProfile from "./pages/lecturer/LecturerProfile"
import LecturerCourses from "./pages/lecturer/LecturerCourses"
import CourseDetails from "./pages/lecturer/CourseDetails"
import LecturerPrograms from "./pages/lecturer/LecturerPrograms"
import LecturerExams from "./pages/lecturer/LecturerExams"
import LecturerScores from "./pages/lecturer/LecturerScores"
import LecturerSettings from "./pages/lecturer/LecturerSettings"
import LecturerChangePassword from "./pages/lecturer/LecturerChangePassword"

// Placeholder components for other routes
const Home = () => <div>Home Page</div>
const AdminPanel = () => <div>Admin Panel</div>
const Lecturers = () => <div>Lecturers Page</div>
const Students = () => <div>Students Page</div>
const ProgramsCourses = () => <div>Programs & Courses Page</div>
const Exams = () => <div>Complete Exams Page</div>
const QuizProgress = () => <div>Quiz Progress Page</div>
const CourseAllocation = () => <div>Course Allocation Page</div>
const Session = () => <div>Manage Session Page</div>
const Semester = () => <div>Manage Semester Page</div>
const AccountSettings = () => <div>Account Settings Page</div>
const ChangePassword = () => <div>Change Password Page</div>

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/lecturer" replace />} />

        {/* Lecturer Routes */}
        <Route path="/lecturer" element={<LecturerLayout />}>
          <Route index element={<LecturerHome />} />
          <Route path="profile" element={<LecturerProfile />} />
          <Route path="courses" element={<LecturerCourses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="programs" element={<LecturerPrograms />} />
          <Route path="exams" element={<LecturerExams />} />
          <Route path="scores" element={<LecturerScores />} />
          <Route path="settings" element={<LecturerSettings />} />
          <Route path="change-password" element={<LecturerChangePassword />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="panel" element={<AdminPanel />} />
          <Route path="lecturers" element={<Lecturers />} />
          <Route path="students" element={<Students />} />
          <Route path="programs-courses" element={<ProgramsCourses />} />
          <Route path="exams" element={<Exams />} />
          <Route path="quiz-progress" element={<QuizProgress />} />
          <Route path="course-allocation" element={<CourseAllocation />} />
          <Route path="session" element={<Session />} />
          <Route path="semester" element={<Semester />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

