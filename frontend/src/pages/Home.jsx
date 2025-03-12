import {
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Paper,
} from "@mui/material"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Navbar from "../components/Navbar"
import Footer from "./Footer"
import { Group, MenuBook, Person, Star } from "@mui/icons-material"
import TeacherDashboard from "./TeacherDashboard"

const Home = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
      image: "./assets/1.jpg?height=400&width=600",
      price: "$99",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Explore the world of data analysis, machine learning, and statistical modeling.",
      image: "/placeholder.svg?height=400&width=600",
      price: "$129",
    },
    {
      id: 3,
      title: "Digital Marketing Essentials",
      description: "Master the art of online marketing, SEO, and social media strategies.",
      image: "./assets/1.jpg?height=400&width=600",
      price: "$89",
    },
    {
      id: 4,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile apps using React Native and JavaScript.",
      image: "/placeholder.svg?height=400&width=600",
      price: "$149",
    },
    {
      id: 5,
      title: "Artificial Intelligence and Machine Learning",
      description: "Dive into the world of AI and ML with practical projects and real-world applications.",
      image: "/placeholder.svg?height=400&width=600",
      price: "$199",
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      description: "Learn to protect systems and networks from digital attacks and threats.",
      image: "/placeholder.svg?height=400&width=600",
      price: "$139",
    },
  ]

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const stats = [
    { icon: <MenuBook fontSize="large" />, count: "150+", label: "Courses" },
    { icon: <Person fontSize="large" />, count: "50+", label: "Expert Instructors" },
    { icon: <Group fontSize="large" />, count: "10,000+", label: "Students" },
    { icon: <Star fontSize="large" />, count: "4.8", label: "Average Rating" },
  ]

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "#f5f5f5",
      }}
    >
      <Navbar sx={{ bgcolor: "black" }} />

      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        {/* Hero Section */}
        <Box
          sx={{
            color: "white",
            py: 12,
            width: "100%",
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/hero-background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 4, fontSize: { xs: "2.5rem", md: "3.75rem" } }}
            >
              Empower Your Future with EduConnect
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{ mb: 4, maxWidth: "800px", fontSize: { xs: "1rem", md: "1.5rem" } }}
            >
              Access world-class education from anywhere. Learn at your own pace, gain in-demand skills, and transform
              your career with our cutting-edge distance learning platform.
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ mr: 2, px: 4, py: 1.5, fontSize: "1.1rem" }}>
              Explore Courses
            </Button>
            <Button variant="outlined" color="inherit" size="large" sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}>
              Learn More
            </Button>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ py: 8, backgroundColor: "white" }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ color: "primary.main", mb: 2 }}>{stat.icon}</Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                      {stat.count}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Course Carousel Section */}
        <Box sx={{ py: 8, width: "100%" }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: "bold" }}>
              Featured Courses
            </Typography>
            <Slider {...sliderSettings}>
              {courses.map((course) => (
                <Box key={course.id} sx={{ p: 2 }}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      mx: "auto",
                      boxShadow: 3,
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia component="img" height="200" image={course.image} alt={course.title} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {course.description}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                        {course.price}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                      <Button size="small" variant="outlined" sx={{ minWidth: "100px" }}>
                        Details
                      </Button>
                      <Button size="small" variant="contained" sx={{ minWidth: "100px" }}>
                        Enroll
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Slider>
          </Container>
        </Box>

        {/* Additional Sections */}
        {/* You can add more sections here as needed */}
      </Box>
<TeacherDashboard />
      <Footer />
    </Box>
  )
}

export default Home

