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
  Quiz,
  Grade,
  Assignment,
  AddCircleOutline,
  AccountBalance,
  Notifications,
  Settings,
  ExitToApp,
} from "@mui/icons-material"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"

// Import components
import StudentHome from "./student/StudentHome"
import StudentProfile from "./student/StudentProfile"
import MyCourses from "./student/MyCourses"
import AllPrograms from "./student/AllPrograms"
import QuizProgress from "./student/QuizProgress"
import GradeResult from "./student/GradeResult"
import AssignmentResult from "./student/AssignmentResult"
import AddDropCourses from "./student/AddDropCourses"
import Accounting from "./student/Accounting"
import StudentNotifications from "./student/StudentNotifications"
import StudentSettings from "./student/StudentSettings"
import ChatComponent from "./student/ChatComponent"

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
  { text: "Home", icon: <Home />, path: "/studentDashboard" },
  { text: "Profile", icon: <Person />, path: "/studentDashboard/profile" },
  { text: "My Courses", icon: <Book />, path: "/studentDashboard/my-courses" },
  { text: "All Programs", icon: <School />, path: "/studentDashboard/all-programs" },
  { text: "Quiz Progress", icon: <Quiz />, path: "/studentDashboard/quiz-progress" },
  { text: "Grade Results", icon: <Grade />, path: "/studentDashboard/grade-results" },
  { text: "Assignment Results", icon: <Assignment />, path: "/studentDashboard/assignment-results" },
  { text: "Add/Drop Courses", icon: <AddCircleOutline />, path: "/studentDashboard/add-drop-courses" },
  { text: "Accounting", icon: <AccountBalance />, path: "/studentDashboard/accounting" },
  { text: "Notifications", icon: <Notifications />, path: "/studentDashboard/notifications" },
  { text: "Settings", icon: <Settings />, path: "/studentDashboard/settings" },
]

export default function StudentDashboard() {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const [studentInfo, setStudentInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    // Fetch student information
    const fetchStudentInfo = async () => {
      try {
        setLoading(true)
        // In a real app, you would use the actual API call
        // const response = await axios.get('http://localhost:5000/api/student/profile', {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // setStudentInfo(response.data);

        // For demo purposes, we'll simulate an API response
        setTimeout(() => {
          setStudentInfo({
            id: "12345",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            avatar: null,
            role: "student",
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching student info:", error)
        setLoading(false)
        // Handle authentication errors
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token")
          localStorage.removeItem("userRole")
          navigate("/auth")
        }
      }
    }

    fetchStudentInfo()
  }, [navigate])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
      // Still remove token and redirect on error
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
      navigate("/auth")
    }
    handleClose()
  }

  // Get the current page title based on the path
  const getCurrentPageTitle = () => {
    const path = location.pathname.split("/").pop()
    if (path === "student-dashboard" || path === "") {
      return "Dashboard"
    }
    const menuItem = menuItems.find((item) => item.path === path)
    return menuItem ? menuItem.text : "Dashboard"
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
          {!loading && studentInfo && (
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
                {studentInfo.avatar ? (
                  <img src={studentInfo.avatar || "/placeholder.svg"} alt={studentInfo.firstName} />
                ) : (
                  studentInfo.firstName.charAt(0) + studentInfo.lastName.charAt(0)
                )}
              </Avatar>
            </IconButton>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                navigate("profile")
                handleClose()
              }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("settings")
                handleClose()
              }}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", px: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Student Portal
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
              <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>{studentInfo?.firstName?.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle1">
                  {studentInfo?.firstName} {studentInfo?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {studentInfo?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <Divider />
        <List>
          {menuItems.map((item) => {
            const isActive =
              location.pathname === `/student-dashboard/${item.path}` ||
              (item.path === "" && location.pathname === "/student-dashboard")
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={isActive}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.12)",
                      },
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
          <Route path="" element={<StudentHome />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="all-programs" element={<AllPrograms />} />
          <Route path="quiz-progress" element={<QuizProgress />} />
          <Route path="grade-results" element={<GradeResult />} />
          <Route path="assignment-results" element={<AssignmentResult />} />
          <Route path="add-drop-courses" element={<AddDropCourses />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="settings" element={<StudentSettings />} />
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

