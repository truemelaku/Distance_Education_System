"use client"

import React from "react"

const Profile = ({ setTitle }) => {
  React.useEffect(() => {
    setTitle("Profile")
  }, [setTitle])

  return <div>Profile Component</div>
}

export default Profile

