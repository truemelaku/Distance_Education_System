import { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Courses = ({ userRole }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // This data should come from your backend
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "8 weeks",
      instructor: "Jane Doe",
      price: "$99",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Explore the world of data analysis, machine learning, and statistical modeling.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "10 weeks",
      instructor: "John Smith",
      price: "$129",
    },
    {
      id: 3,
      title: "Digital Marketing Essentials",
      description: "Master the art of online marketing, SEO, and social media strategies.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "6 weeks",
      instructor: "Alice Johnson",
      price: "$89",
    },
    {
      id: 4,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile apps using React Native and JavaScript.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "12 weeks",
      instructor: "Bob Wilson",
      price: "$149",
    },
    {
      id: 5,
      title: "Artificial Intelligence and Machine Learning",
      description: "Dive into the world of AI and ML with practical projects and real-world applications.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "14 weeks",
      instructor: "Eva Brown",
      price: "$199",
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      description: "Learn to protect systems and networks from digital attacks and threats.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "10 weeks",
      instructor: "Michael Lee",
      price: "$139",
    },
  ];

  const handleOpenDialog = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEnroll = (courseId) => {
    // Implement enrollment logic here
    console.log(`Enrolled in course ${courseId}`);
  };

  const settings = {
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
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {userRole === "student" ? "Available Courses" : "Manage Courses"}
      </Typography>
      <Slider {...settings}>
        {courses.map((course) => (
          <div key={course.id} style={{ padding: "10px" }}>
            <Card sx={{ maxWidth: 345, mx: "auto" }}>
              <CardMedia component="img" height="140" image={course.image} alt={course.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  {course.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpenDialog(course)}>
                  Details
                </Button>
                {userRole === "student" && (
                  <Button size="small" onClick={() => handleEnroll(course.id)}>
                    Enroll
                  </Button>
                )}
                {(userRole === "teacher" || userRole === "admin") && (
                  <>
                    <Button size="small">Edit</Button>
                    <Button size="small" color="error">
                      Delete
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
      {(userRole === "teacher" || userRole === "admin") && (
        <Button variant="contained" sx={{ mt: 3 }}>
          Add New Course
        </Button>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedCourse && (
          <>
            <DialogTitle>{selectedCourse.title}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedCourse.image || "/placeholder.svg"}
                    alt={selectedCourse.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" paragraph>
                    {selectedCourse.description}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Duration:</strong> {selectedCourse.duration}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Instructor:</strong> {selectedCourse.instructor}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    <strong>Price:</strong> {selectedCourse.price}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              {userRole === "student" && (
                <Button onClick={() => handleEnroll(selectedCourse.id)} variant="contained" color="primary">
                  Enroll
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

Courses.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Courses;