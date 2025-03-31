import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, Avatar, Paper } from "@mui/material";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // Fetch admin profile data
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token);

    if (!token) {
      setError("Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/admins/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserData(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data. You are not authorized.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (error) {
    return (
      <Box className="mt-10 p-6 flex justify-center">
        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            textAlign: "center",
            backgroundColor: "#ffebee",
          }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        paddingRight: "2rem",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Card
        sx={{
          padding: "24px",
          boxShadow: 3,
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: "auto",
              backgroundColor: "#3f51b5",
            }}
          >
            {userData?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="h4"
            sx={{ marginTop: "16px", fontWeight: "bold" }}
          >
            Your Profile
          </Typography>
        </Box>

        {userData ? (
          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography variant="h6">
              <strong>Username:</strong> {userData.adminId}
            </Typography>
            <Typography variant="h6">
              <strong>Email:</strong> {userData.email}
            </Typography>
            <Typography variant="h6">
              <strong>Full Name:</strong> {userData.name}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ marginTop: "16px", color: "gray" }}>
            Loading...
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default Profile;
