import React from "react";
import { Grid, Box, Container, Typography } from "@mui/material/";
const Footer = () => (
  <footer style={{ width: "100%" }}>
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      color="white"
      bgcolor="#b3b3b3"
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom component="div">
              Simply Degree
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom component="div">
              Home
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom component="div">
              Logout
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </footer>
);

export default Footer;
