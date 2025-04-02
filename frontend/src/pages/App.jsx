import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/lecturer/Home";
import Profile from "./pages/lecturer/Profile";
import MyCourses from "./pages/lecturer/MyCourses";
import AllPrograms from "./pages/lecturer/AllPrograms";
import ProgramDetail from "./pages/lecturer/ProgramDetail";
import CompleteExams from "./pages/lecturer/CompleteExams";
import ManageScore from "./pages/lecturer/ManageScore";
import AccountSetting from "./pages/lecturer/AccountSetting";
import ChangePassword from "./pages/lecturer/ChangePassword";
import ChatSystem from "./components/ChatSystem";
import CourseDetail from "./pages/lecturer/CourseDetail";

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar onChatToggle={() => setChatOpen(!chatOpen)} />
            <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/all-programs" element={<AllPrograms />} />
                <Route
                  path="/program/:programCode"
                  element={<ProgramDetail />}
                />
                <Route path="/complete-exams" element={<CompleteExams />} />
                <Route path="/manage-score" element={<ManageScore />} />
                <Route path="/account-setting" element={<AccountSetting />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/course/:courseId" element={<CourseDetail />} />
              </Routes>
            </main>
          </div>
          {chatOpen && <ChatSystem onClose={() => setChatOpen(false)} />}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
