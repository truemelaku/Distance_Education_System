import { Typography, Grid, Card, CardContent, CardActions, Button } from "@mui/material"

const AllPrograms = () => {
  const programs = [
    { id: 1, name: "Computer Science", description: "Study the theory and practice of computation." },
    { id: 2, name: "Business Administration", description: "Learn to manage organizations and businesses." },
    { id: 3, name: "Psychology", description: "Explore the human mind and behavior." },
    { id: 4, name: "Engineering", description: "Apply scientific and mathematical principles to solve problems." },
  ]

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        All Programs
      </Typography>
      <Grid container spacing={3}>
        {programs.map((program) => (
          <Grid item xs={12} sm={6} md={4} key={program.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {program.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {program.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
                <Button size="small">Apply</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default AllPrograms

