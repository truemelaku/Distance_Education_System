import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', py: 6, width: '100%' }}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              EduConnect
            </Typography>
            <Typography variant="body2">
              Empowering learners worldwide through quality distance education.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block">Home</Link>
            <Link href="/courses" color="inherit" display="block">Courses</Link>
            <Link href="/about" color="inherit" display="block">About Us</Link>
            <Link href="/contact" color="inherit" display="block">Contact</Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Education St, E-learning City, 12345
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2">
              Email: info@educonnect.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit"><Facebook /></Link>
              <Link href="#" color="inherit"><Twitter /></Link>
              <Link href="#" color="inherit"><Instagram /></Link>
              <Link href="#" color="inherit"><LinkedIn /></Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            © 2024 EduConnect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

