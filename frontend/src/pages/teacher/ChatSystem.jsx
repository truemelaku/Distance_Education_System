"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, User, ChevronDown } from "lucide-react"
//import { api } from "../services/api"

const ChatSystem = ({ onClose }) => {
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await api.getChats()
        setChats(data)
      } catch (err) {
        setError("Failed to load chats")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  useEffect(() => {
    if (activeChat) {
      scrollToBottom()

      // Mark messages as read when opening a chat
      setChats((prevChats) => prevChats.map((chat) => (chat.id === activeChat.id ? { ...chat, unread: 0 } : chat)))
    }
  }, [activeChat])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim() || !activeChat) return

    try {
      const newMessage = await api.sendMessage(activeChat.id, message)

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat,
        ),
      )

      // Update the active chat with the new message
      setActiveChat((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }))

      setMessage("")
    } catch (err) {
      console.error("Failed to send message:", err)
      // Show error to user
    }
  }

  if (loading) {
    return (
      <div className="fixed bottom-0 right-4 w-80 bg-white shadow-lg rounded-t-lg flex flex-col z-10 border border-gray-200">
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
          <h3 className="font-medium">Chat System</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed bottom-0 right-4 w-80 bg-white shadow-lg rounded-t-lg flex flex-col z-10 border border-gray-200">
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
          <h3 className="font-medium">Chat System</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 right-4 w-80 bg-white shadow-lg rounded-t-lg flex flex-col z-10 border border-gray-200">
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium">Chat System</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      {!activeChat ? (
        <div className="overflow-y-auto max-h-96">
          <div className="p-3 border-b border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Recent Conversations</h4>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">{chat.name}</span>
                    {chat.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{chat.unread}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{chat.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => setActiveChat(null)}
            className="p-3 border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-100"
          >
            <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
            <div className="flex-1">
              <div className="font-medium text-gray-800">{activeChat.name}</div>
              <div className="text-xs text-gray-500">{activeChat.role}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 max-h-80">
            {activeChat.messages.map((msg) => (
              <div key={msg.id} className={`mb-3 flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${
                    msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default ChatSystem

