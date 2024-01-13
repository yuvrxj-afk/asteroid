import React from "react";
import {
  Typography,
  Container,
  Paper,
  Backdrop,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import bgVideo from "../assets/asteroid.mp4";
import Search from "./Search";

interface AsteroidProps {
  asteroidData: {
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
  };
  loading: boolean;
}

class Asteroid extends React.Component<AsteroidProps> {
  navigate = useNavigate();

  handleSearch = (searchId: string) => {
    this.navigate(`/details/${searchId}`);
  };

  render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    const asteroidData = location.state?.asteroidData || null;
    const loading = this.props.loading;

    // const { asteroidData, loading } = this.props;

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
          sx={{ background: "rgba(255, 255, 255, 0.0)", marginTop: "20px" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
            <div
              onClick={() => this.navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h3" color={"white"} fontWeight={"bolder"}>
                Cosmic Search
              </Typography>
            </div>
            <Search onSearch={this.handleSearch} />
          </Toolbar>
        </AppBar>

        {/* Main container */}
        <Container sx={bgStyling}>
          {loading && (
            <Backdrop
              open={loading}
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
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

export default Asteroid;
