"use client"

import { useState, useEffect } from "react"
import { styled, useTheme } from "@mui/material/styles"
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  CircularProgress,
  Backdrop,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import {
  Home,
  Person,
  Book,
  School,
  Grade,
  Assignment,
  Upload,
  CalendarMonth,
  Message,
  Notifications,
  Settings,
  ExitToApp,
} from "@mui/icons-material"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"

// Import teacher components from ./teacher/
//import TeacherLayout from "./components/layout/TeacherLayout"
import TeacherHome from "./teacher/TeacherHome"
import TeacherProfile from "./teacher/TeacherProfile"
import MyCourses from "./teacher/MyCourses"
import AllPrograms from "./teacher/AllPrograms"
import ManageScores from "./teacher/ManageScores"
import UploadContent from "./teacher/UploadContent"
import AssignmentManagement from "./teacher/AssignmentManagement"
import CourseManagement from "./teacher/MyCourses" // or separate TeacherCourseManagement
import StudentManagement from "./teacher/StudentManagement"
import TeacherSchedule from "./teacher/TeacherSchedule"
import TeacherMessages from "./teacher/TeacherMessages"
import TeacherNotifications from "./teacher/TeacherNotifications"
import TeacherSettings from "./teacher/TeacherSettings"
import ChatComponent from "./teacher/ChatComponent"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

const menuItems = [
  { text: "Home", icon: <Home />, path: "/teacher" },
  { text: "Profile", icon: <Person />, path: "/teacher/profile" },
  { text: "My Courses", icon: <Book />, path: "/teacher/courses" },
  { text: "All Programs", icon: <School />, path: "/teacher/programs" },
  { text: "Assignments", icon: <Assignment />, path: "/teacher/assignments" },
  { text: "Manage Scores", icon: <Grade />, path: "/teacher/scores" },
  { text: "Upload Content", icon: <Upload />, path: "/teacher/upload" },
  { text: "Course Management", icon: <Book />, path: "/teacher/course-management" },
  { text: "Student Management", icon: <Person />, path: "/teacher/student-management" },
  { text: "Schedule", icon: <CalendarMonth />, path: "/teacher/schedule" },
  { text: "Messages", icon: <Message />, path: "/teacher/messages" },
  { text: "Notifications", icon: <Notifications />, path: "/teacher/notifications" },
  { text: "Settings", icon: <Settings />, path: "/teacher/settings" },
]

export default function TeacherDashboard() {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const [teacherInfo, setTeacherInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        setLoading(true)
        setTimeout(() => {
          setTeacherInfo({
            id: "T12345",
            firstName: "Dr.",
            lastName: "Smith",
            email: "dr.smith@example.com",
            avatar: null,
            role: "teacher",
            department: "Computer Science",
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching teacher info:", error)
        setLoading(false)
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token")
          localStorage.removeItem("userRole")
          navigate("/auth")
        }
      }
    }
    fetchTeacherInfo()
  }, [navigate])

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  const handleMenu = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      setTimeout(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        setLoggingOut(false)
        navigate("/auth")
      }, 1000)
    } catch (error) {
      console.error("Error logging out:", error)
      setLoggingOut(false)
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
      navigate("/auth")
    }
    handleClose()
  }

  const getCurrentPageTitle = () => {
    const path = location.pathname
    if (path === "/teacher") return "Dashboard"
    const menuItem = menuItems.find((item) => path.includes(item.path))
    return menuItem ? menuItem.text : "Dashboard"
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getCurrentPageTitle()}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="notifications"
            sx={{ mr: 2 }}
            onClick={() => navigate("/teacher/notifications")}
          >
            <Notifications />
          </IconButton>
          {!loading && teacherInfo && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                {teacherInfo.avatar ? (
                  <img src={teacherInfo.avatar || "/placeholder.svg"} alt={teacherInfo.firstName} />
                ) : (
                  teacherInfo.firstName.charAt(0) + teacherInfo.lastName.charAt(0)
                )}
              </Avatar>
            </IconButton>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate("/teacher/profile"); handleClose() }}>
              <ListItemIcon><Person fontSize="small" /></ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate("/teacher/settings"); handleClose() }}>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><ExitToApp fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", px: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Teacher Portal
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>{teacherInfo?.firstName?.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle1">
                  {teacherInfo?.firstName} {teacherInfo?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {teacherInfo?.department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {teacherInfo?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <Divider />
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/teacher" && location.pathname.startsWith(item.path))
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={isActive}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.12)" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "primary.main" : "inherit" }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? "bold" : "regular",
                      color: isActive ? "primary.main" : "inherit",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="" element={<TeacherHome />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="programs" element={<AllPrograms />} />
          <Route path="programs/:programId" element={<AllPrograms />} />
          <Route path="assignments" element={<AssignmentManagement />} />
          <Route path="scores" element={<ManageScores />} />
          <Route path="upload" element={<UploadContent />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="courses/:courseId" element={<CourseManagement />} />
          <Route path="student-management" element={<StudentManagement />} />
          <Route path="schedule" element={<TeacherSchedule />} />
          <Route path="messages" element={<TeacherMessages />} />
          <Route path="notifications" element={<TeacherNotifications />} />
          <Route path="settings" element={<TeacherSettings />} />
        </Routes>
        <ChatComponent />
      </Main>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loggingOut}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2 }}>Logging out...</Typography>
        </Box>
      </Backdrop>
    </Box>
  )
}