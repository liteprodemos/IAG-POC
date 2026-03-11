// npm run deploy
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Paper,
  Grid,
} from "@mui/material";

function App() {
  const [sfData, setSfData] = useState(null);

  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     if (event.origin !== "https://racv--cbqa.sandbox.my.site.com") {
  //       return;
  //     }

  //     console.log("Data received from Salesforce:", event.data);
  //     setSfData(event.data);
  //   };

  //   window.addEventListener("message", handleMessage);
  //   return () => window.removeEventListener("message", handleMessage);
  // }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://racv--cbdevpro.sandbox.my.site.com") {
        return;
      }

      console.log("Raw data received:", event.data);

      let parsedData;

      try {
        // If it's a string, parse it
        parsedData =
          typeof event.data === "string"
            ? JSON.parse(event.data)
            : event.data;

        console.log("Parsed data:", parsedData);
        setSfData(parsedData);
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            IAG POC - Salesforce Integration with I frame
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>

        {/* Iframe Section */}
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            borderRadius: 3,
            mb: 4,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Salesforce Customer Search
          </Typography>

          <Box
            sx={{
              border: "2px solid #1976d2",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* <iframe
              src="https://racv--cbqa.sandbox.my.site.com/s/testpoccustsearch"
              width="100%"
              height="500px"
              style={{ border: "none" }}
              title="Salesforce Iframe"
            /> */}
            <iframe
              src="https://racv--cbdevpro.sandbox.my.site.com/s/pocexternalcustomermanager"
              width="100%"
              height="500px"
              style={{ border: "none" }}
              title="Salesforce Iframe"
            />
          </Box>
        </Paper>

        {/* Data Display Section */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Data Received From Salesforce
            </Typography>

            {sfData ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>ID:</strong> {sfData.Id}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Name:</strong> {sfData.Name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Email:</strong> {sfData.PersonEmail}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Mobile:</strong> {sfData.PersonMobilePhone}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography color="text.secondary">
                No data received yet...
              </Typography>
            )}
          </CardContent>
        </Card>

      </Container>
      
    </Box>
  );
}

export default App;