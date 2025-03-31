"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"
import { api } from "../services/api"
import LoadingSpinner from "./LoadingSpinner"

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 p-3 mb-4 rounded">
          <span className="text-gray-700">Profile</span>
        </div>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 p-3 mb-4 rounded">
          <span className="text-gray-700">Profile</span>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">Profile</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Lecturer Profile</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
              <img src="/avatar.png" alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
              <h3 className="text-xl font-medium">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-gray-500">{profile.role}</p>
              <p className="text-gray-500">{profile.department}</p>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Personal Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Office:</span>
                    <span>{profile.office}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Office Hours:</span>
                    <span>{profile.officeHours}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Academic Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Specialization:</span>
                    <span>{profile.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Courses:</span>
                    <span>5 Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Students:</span>
                    <span>120</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Experience:</span>
                    <span>{profile.experience}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Biography</h4>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

