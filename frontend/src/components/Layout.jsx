import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
  } from "@mui/material"
  import { useNavigate, Outlet } from "react-router-dom"
  import { Dashboard, School, People, ExitToApp } from "@mui/icons-material"

  const drawerWidth = 240
  
  const Layout = ({ userRole }) => {
    const navigate = useNavigate()
  
    const menuItems = [
      { text: "Dashboard", icon: <Dashboard />, path: `/${userRole}-dashboard` },
      { text: "Courses", icon: <School />, path: "/courses" },
      { text: "Profile", icon: <People />, path: "/profile" },
      { text: "Logout", icon: <ExitToApp />, path: "/logout" },
    ]
  
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              EduConnect - {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    )
  }
  
  export default Layout
  
  