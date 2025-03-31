"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"
//import { api } from "../../services/api"
import LoadingSpinner from "./LoadingSpinner"

const AccountSetting = () => {
  const { user, updateUserProfile } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile()
        setProfile(data)
      } catch (err) {
        setError("Failed to load profile data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccessMessage("")

    try {
      const updatedProfile = await api.updateProfile(profile)
      updateUserProfile(updatedProfile)
      setSuccessMessage("Profile updated successfully!")
    } catch (err) {
      setError("Failed to update profile")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 p-3 mb-4 rounded">
          <span className="text-gray-700">Account Setting</span>
        </div>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 p-3 mb-4 rounded">
          <span className="text-gray-700">Account Setting</span>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Failed to load profile data</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">Account Setting</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Account Settings</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium mb-4">Profile Picture</h3>
              <div className="flex flex-col items-center">
                <img src="/avatar.png" alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Change Picture</button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Office Location</label>
                <input
                  type="text"
                  name="office"
                  value={profile.office}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
                <input
                  type="text"
                  name="officeHours"
                  value={profile.officeHours}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSetting

