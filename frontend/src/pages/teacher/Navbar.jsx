"use client"

import { Search, MessageCircle, Bell, ChevronDown } from "lucide-react"
import { useAuth } from "./contexts/AuthContext"

const Navbar = ({ onChatToggle }) => {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button className="p-2 mr-2 text-gray-500 hover:text-gray-700 md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search All.. #course, #program, #Quiz, #News, #Events"
              className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-0 top-0 h-full px-3 text-gray-500">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center ml-4">
          <button onClick={onChatToggle} className="p-2 text-gray-500 hover:text-gray-700 relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="ml-3 relative">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user?.avatar || "/avatar.png"}
                alt="User avatar"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">{user?.name || "Amir Mohammed"}</span>
              <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

