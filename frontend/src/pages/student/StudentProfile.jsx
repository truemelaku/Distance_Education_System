"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, Avatar, Paper } from "@mui/material";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // Define fetchUserData function
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token);

    if (!token) {
      setError("Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/students/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserData(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch user data. You are not authorized.", err);
    }
  };

  useEffect(() => {
    fetchUserData(); // Call fetchUserData when component mounts
  }, []);

  if (error) {
    return (
      <Box className="mt-10 p-6 flex justify-center">
        <Paper elevation={3} className="p-6 text-center bg-red-50">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      className="mt-10 flex justify-end items-start"
      sx={{ minHeight: "80vh", paddingRight: "2rem" }}
    >
      {/* Pass fetchUserData as prop to StudentHome */}

      <Card className="p-6 shadow-xl w-full max-w-lg bg-white">
        <Box className="text-center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: "auto",
              backgroundColor: "#3f51b5",
            }}
          >
            {userData?.firstName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" className="mt-4 font-bold">
            Your Profile
          </Typography>
        </Box>

        {userData ? (
          <Box className="mt-6 space-y-3">
            <Typography variant="h6">
              <strong>Username:</strong> {userData.studentId}
            </Typography>
            <Typography variant="h6">
              <strong>Email:</strong> {userData.email}
            </Typography>
            <Typography variant="h6">
              <strong>First Name:</strong> {userData.firstName}
            </Typography>
            <Typography variant="h6">
              <strong>Middle Name:</strong> {userData.middleName}
            </Typography>
            <Typography variant="h6">
              <strong>Last Name:</strong> {userData.lastName}
            </Typography>
            <Typography variant="h6">
              <strong>Department:</strong> {userData.department}
            </Typography>
            <Typography variant="h6">
              <strong>Gender:</strong> {userData.gender}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" className="mt-4 text-gray-500">
            Loading...
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default Profile;
