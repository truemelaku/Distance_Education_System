"use client"

import { useState } from "react"

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would call an API endpoint to change the password
      // const response = await api.changePassword(currentPassword, newPassword);

      setSuccess("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setError("Failed to update password. Please check your current password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">Change Password</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Change Password</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <div className="max-w-md mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Confirm your new password"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword

