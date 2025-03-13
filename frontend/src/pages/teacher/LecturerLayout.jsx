"use client"

import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  Home,
  Person,
  Book,
  School,
  Assignment,
  Score,
  Settings,
  Lock,
  Search as SearchIcon,
  ExitToApp as SignOutIcon,
} from "@mui/icons-material"

const drawerWidth = 280

const menuItems = [
  { title: "Home", icon: Home, path: "/lecturer" },
  { title: "Profile", icon: Person, path: "/lecturer/profile" },
  { title: "My Courses", icon: Book, path: "/lecturer/courses" },
  { title: "All Programs & Courses", icon: School, path: "/lecturer/programs" },
  { title: "Complete Exams", icon: Assignment, path: "/lecturer/exams" },
  { title: "Manage Score", icon: Score, path: "/lecturer/scores" },
  { title: "Account Setting", icon: Settings, path: "/lecturer/settings" },
  { title: "Change Password", icon: Lock, path: "/lecturer/change-password" },
]

function LecturerLayout() {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const drawer = (
    <Box>
      {/* Logo and Role */}
      <Box className="p-4 border-b">
        <Box className="flex items-center gap-3">
          <Box className="w-12 h-12">
            <img src="/placeholder.svg" alt="Logo" className="w-full h-full object-contain" />
          </Box>
          <Box>
            <Typography variant="h6" className="text-gray-800">
              your logo
            </Typography>
            
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List className="pt-0">
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              className={`my-1 mx-2 rounded-md ${
                location.pathname === item.path ? "bg-gray-200 hover:bg-gray-300" : "hover:bg-gray-100"
              }`}
            >
              <ListItemIcon>
                <item.icon className="text-gray-600" />
              </ListItemIcon>
              <ListItemText primary={item.title} className="text-gray-700" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <InputBase
              placeholder="Search..."
              sx={{ color: "inherit", "& input": { color: "inherit" } }}
              startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            />
            <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
              <Avatar alt="Amir Mohammed" src="/placeholder.svg" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
        <MenuItem component={Link} to="/lecturer/profile" onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/lecturer/courses" onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Book fontSize="small" />
          </ListItemIcon>
          My Courses
        </MenuItem>
        <MenuItem component={Link} to="/lecturer/settings" onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <SignOutIcon fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: ["56px", "64px"], // Adjust based on AppBar height
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default LecturerLayout

