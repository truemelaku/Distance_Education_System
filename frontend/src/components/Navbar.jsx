import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "black" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
        >
          EduConnect
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={RouterLink} to="/" sx={{ mr: 2 }}>
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/courses" sx={{ mr: 2 }}>
            Courses
          </Button>
          <Button color="inherit" component={RouterLink} to="/about" sx={{ mr: 2 }}>
            About
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact" sx={{ mr: 2 }}>
            Contact
          </Button>
          <Button color="inherit" component={RouterLink} to="/registration" variant="outlined" sx={{ borderColor: "white" }}>
            Register here
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

