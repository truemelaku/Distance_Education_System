"use client"

import { Link, useLocation } from "react-router-dom"
import { HomeIcon, User, Book, BookOpen, FileText, BarChart2, Settings, Key } from "lucide-react"
import { useAuth } from "./contexts/AuthContext"

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-300 text-gray-800" : "text-gray-600 hover:bg-gray-200"
  }

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <div className="ml-2 text-gray-700">
            <div className="text-sm font-medium">your logo</div>
            <div className="text-lg font-bold">HERE</div>
          </div>
        </div>
        <div className="flex items-center text-orange-500 font-medium">
          <span className="mr-2">•</span>
          <span>{user?.role || "Lecturer"}</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="py-2">
          <li>
            <Link to="/" className={`flex items-center px-4 py-3 ${isActive("/")}`}>
              <HomeIcon className="h-5 w-5 mr-3" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className={`flex items-center px-4 py-3 ${isActive("/profile")}`}>
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/my-courses" className={`flex items-center px-4 py-3 ${isActive("/my-courses")}`}>
              <Book className="h-5 w-5 mr-3" />
              <span>My Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/all-programs" className={`flex items-center px-4 py-3 ${isActive("/all-programs")}`}>
              <BookOpen className="h-5 w-5 mr-3" />
              <span>All Programs & Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/complete-exams" className={`flex items-center px-4 py-3 ${isActive("/complete-exams")}`}>
              <FileText className="h-5 w-5 mr-3" />
              <span>Complete Exams</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-score" className={`flex items-center px-4 py-3 ${isActive("/manage-score")}`}>
              <BarChart2 className="h-5 w-5 mr-3" />
              <span>Manage Score</span>
            </Link>
          </li>
        </ul>

        <div className="px-4 py-2 text-xs text-gray-500">others</div>

        <ul className="py-2">
          <li>
            <Link to="/account-setting" className={`flex items-center px-4 py-3 ${isActive("/account-setting")}`}>
              <Settings className="h-5 w-5 mr-3" />
              <span>Account Setting</span>
            </Link>
          </li>
          <li>
            <Link to="/change-password" className={`flex items-center px-4 py-3 ${isActive("/change-password")}`}>
              <Key className="h-5 w-5 mr-3" />
              <span>Change Password</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

