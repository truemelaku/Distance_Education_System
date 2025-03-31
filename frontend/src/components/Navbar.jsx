import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

const Navbar = () => {
  // State for dropdown menu
  const [departmentAnchorEl, setDepartmentAnchorEl] = useState(null);
  const isDepartmentMenuOpen = Boolean(departmentAnchorEl);

  // Handlers for dropdown menu
  const handleDepartmentMenuOpen = (event) => {
    setDepartmentAnchorEl(event.currentTarget);
  };

  const handleDepartmentMenuClose = () => {
    setDepartmentAnchorEl(null);
  };

  // List of departments
  const departments = [
    { name: "Computer Engineering", path: "/departments/Computer Engineering" },
    {
      name: "Electrica Engineering",
      path: "/departments/Electical Engineering",
    },
    { name: "Software Engineering", path: "/departments/Software Engineering" },
    { name: "Information System", path: "/departments/Information System" },
    { name: "Cyber Security", path: "/departments/Cyber Security" },
    {
      name: "Information Technology",
      path: "/departments/Information Technology",
    },
  ];

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

          <Button
            color="inherit"
            component={RouterLink}
            to="/courses"
            sx={{ mr: 2 }}
          >
            Courses
          </Button>

          {/* Departments Dropdown */}
          <Box sx={{ position: "relative" }}>
            <Button
              color="inherit"
              sx={{ mr: 2 }}
              onClick={handleDepartmentMenuOpen}
              endIcon={<KeyboardArrowDown />}
              aria-controls={
                isDepartmentMenuOpen ? "department-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={isDepartmentMenuOpen ? "true" : undefined}
            >
              Departments
            </Button>
            <Menu
              id="department-menu"
              anchorEl={departmentAnchorEl}
              open={isDepartmentMenuOpen}
              onClose={handleDepartmentMenuClose}
              MenuListProps={{
                "aria-labelledby": "department-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {departments.map((dept) => (
                <MenuItem
                  key={dept.path}
                  onClick={handleDepartmentMenuClose}
                  component={RouterLink}
                  to={dept.path}
                >
                  {dept.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Button
            color="inherit"
            component={RouterLink}
            to="/courses"
            sx={{ mr: 2 }}
          >
            Courses
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/about"
            sx={{ mr: 2 }}
          >
            About
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/contact"
            sx={{ mr: 2 }}
          >
            Contact
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/registration"
            variant="outlined"
            sx={{ borderColor: "white" }}
          >
            Register here
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
