import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Box } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a logout process
    const performLogout = async () => {
      try {
        // Clear localStorage/session data
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        setLoading(false);
        // Redirect to login after logout
        navigate("/auth");
      } catch (error) {
        console.error("Error logging out:", error);
        setLoading(false);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      {loading ? (
        <>
          <CircularProgress size={24} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Logging out...
          </Typography>
        </>
      ) : (
        <Typography variant="h6">You have been logged out.</Typography>
      )}
    </Box>
  );
};

export default Logout;
