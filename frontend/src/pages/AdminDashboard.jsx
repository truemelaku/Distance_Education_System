
"use client"

import { useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
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
  Badge,
} from "@mui/material"
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  QuestionAnswer as QuizIcon,
  CalendarToday as CalendarIcon,
  Notifications as NotificationsIcon,
  Feedback as FeedbackIcon,
  AttachMoney as FeeIcon,
  People as PeopleIcon,
  LibraryBooks as ProgramsIcon,
} from "@mui/icons-material"

// Import all the component pages
import DashboardHome from "./admin/DashboardHome"
import AdminHome from "./admin/AdminHome"
import AdminProfile from "./admin/AdminProfile"
import AdminPanel from "./admin/AdminPanel"
import Lectures from "./admin/Lectures"
import Students from "./admin/Students"
import ProgramsAndCourses from "./admin/ProgramsAndCourses"
import CompletedExams from "./admin/CompletedExams"
import QuizProgress from "./admin/QuizProgress"
import CourseAllocation from "./admin/CourseAllocation"
import ManageSession from "./admin/ManageSession"
import ManageSemester from "./admin/ManageSemester"
import NotifyTeachers from "./admin/NotifyTeachers"
import ViewNotifications from "./admin/ViewNotifications"
import Feedback from "./admin/Feedback"
import Fee from "./admin/Fee"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const AppBarStyled = styled(AppBar, {
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
  { id: "dashboard", text: "Dashboard", icon: <DashboardIcon />, component: DashboardHome },
  { id: "home", text: "Home", icon: <HomeIcon />, component: AdminHome },
  { id: "profile", text: "Profile", icon: <PersonIcon />, component: AdminProfile },
  { id: "adminPanel", text: "Admin Panel", icon: <SchoolIcon />, component: AdminPanel },
  { id: "lectures", text: "Lectures", icon: <BookIcon />, component: Lectures },
  { id: "students", text: "Students", icon: <PeopleIcon />, component: Students },
  { id: "programsAndCourses", text: "Programs and Courses", icon: <ProgramsIcon />, component: ProgramsAndCourses },
  { id: "completedExams", text: "Completed Exams", icon: <AssignmentIcon />, component: CompletedExams },
  { id: "quizProgress", text: "Quiz Progress", icon: <QuizIcon />, component: QuizProgress },
  { id: "courseAllocation", text: "Course Allocation", icon: <CalendarIcon />, component: CourseAllocation },
  { id: "manageSession", text: "Manage Session", icon: <CalendarIcon />, component: ManageSession },
  { id: "manageSemester", text: "Manage Semester", icon: <CalendarIcon />, component: ManageSemester },
  { id: "notifyTeachers", text: "Notify Teachers", icon: <NotificationsIcon />, component: NotifyTeachers },
  { id: "viewNotifications", text: "View Notifications", icon: <NotificationsIcon />, component: ViewNotifications },
  { id: "feedback", text: "Feedback", icon: <FeedbackIcon />, component: Feedback },
  { id: "fee", text: "Fee", icon: <FeeIcon />, component: Fee },
]

const AdminDashboard = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedItem, setSelectedItem] = useState("dashboard")

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

  const handleMenuItemClick = (id) => {
    setSelectedItem(id)
    if (window.innerWidth < 600) {
      setOpen(false)
    }
  }

  const handleLogout = () => {
    // Handle logout logic here
    handleClose()
  }

  // Find the current component to render
  const CurrentComponent = menuItems.find((item) => item.id === selectedItem)?.component || DashboardHome


return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
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
            Admin Dashboard
          </Typography>
          <IconButton size="large" aria-label="show new notifications" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
          </IconButton>
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose()
                handleMenuItemClick("profile")
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyled>
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
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            EduConnect
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton selected={selectedItem === item.id} onClick={() => handleMenuItemClick(item.id)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <CurrentComponent />
      </Main>
    </Box>
  )
}

export default AdminDashboard