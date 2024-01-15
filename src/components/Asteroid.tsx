import React from "react";
import { Typography, Container, Paper, AppBar, Toolbar } from "@mui/material";
import bgVideo from "../assets/asteroid.mp4";
import withRouter from "./withRouter";

interface asteroidProps {
  id: string;
  name: string;
  name_limited?: string;
  absolute_magnitude_h?: number;
  is_potentially_hazardous_asteroid?: boolean;
  estimated_diameter?: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    miles: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
}

class Asteroid extends React.Component {
  render() {
    const asteroidData: asteroidProps = this.props.location.state;
    const bgStyling = {
      background: `rgba(0, 0, 0, 0.4)`,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      objectFit: "cover",
      minWidth: "100vw",
      position: "relative",
      zIndex: "2",
    };

    const panelStyling = {
      backgroundColor: "rgba(240, 240, 240, 0.2)",
      color: "white",
      padding: "16px",
      borderRadius: "8px",
      maxHeight: "50vh",
      top: "0px",
    };

    return (
      <>
        {/* video container */}
        <div className="Asteroid-video-container">
          <video autoPlay loop muted className="asteroid-video" src={bgVideo} />
        </div>

        {/* Top Search Bar */}
        <AppBar
          color="secondary"
          enableColorOnDark
          sx={{
            background: "rgba(255, 255, 255, 0.0)",
            marginTop: "20px",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
            <div
              onClick={() => (window.location.href = "/")}
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h3" color={"white"} fontWeight={"bolder"}>
                Go Back
              </Typography>
            </div>
            {/* <Search onSearch={this.handleSearch} /> */}
          </Toolbar>
        </AppBar>

        {/* Main container */}
        <Container sx={bgStyling}>
          {/* Returning the API Response */}
          {asteroidData && (
            <Paper sx={panelStyling}>
              <Typography variant="h4" mb={2} fontWeight={"bold"}>
                Asteroid Information
              </Typography>
              <Typography>ID : {asteroidData.id}</Typography>
              <Typography>Name : {asteroidData.name}</Typography>
              <Typography>
                Name (Limited): {asteroidData.name_limited}
              </Typography>
              <Typography>
                Absolute Magnitude (H): {asteroidData.absolute_magnitude_h}
              </Typography>
              <Typography>
                Is Potentially Hazardous Asteroid:
                {asteroidData.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </Typography>
              <Typography>
                Estimated Diameter (km):
                {
                  asteroidData.estimated_diameter?.kilometers
                    ?.estimated_diameter_min
                }
                -
                {
                  asteroidData.estimated_diameter?.kilometers
                    ?.estimated_diameter_max
                }
              </Typography>
              <Typography>
                Estimated Diameter (miles):
                {
                  asteroidData.estimated_diameter?.miles?.estimated_diameter_min
                }{" "}
                -
                {asteroidData.estimated_diameter?.miles?.estimated_diameter_max}
              </Typography>
            </Paper>
          )}
        </Container>
      </>
    );
  }
}

export default withRouter(Asteroid);
