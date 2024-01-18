import { Component } from "react";
import { Typography, Container, Paper, AppBar, Toolbar } from "@mui/material";
import bgVideo from "../assets/asteroid.mp4";
import withRouter from "./withRouter";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface asteroidProps {
  id: string;
  location: any;
  name: string;
  name_limited?: string;
  absolute_magnitude_h?: number;
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

interface asteroidState {
  asteroidData: asteroidProps | null;
}

class Asteroid extends Component<asteroidProps, asteroidState> {
  constructor(props: any) {
    super(props);
    this.state = {
      asteroidData: null,
    };
  }
  componentDidMount() {
    const { location } = this.props;
    const asteroidset: asteroidProps = location.state;
    const asteroidxData: asteroidProps = asteroidset;
    this.setState({ asteroidData: asteroidxData });
  }

  render() {
    // const asteroidData = this.props.location.state as asteroidProps;
    const { asteroidData } = this.state;
    if (!asteroidData) {
      return null;
    }

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
              data-testid="homeClick"
            >
              <Typography variant="h3" color={"white"} fontWeight={"bolder"}>
                <ArrowBackIosIcon fontSize="large" />
                Go Back
              </Typography>
            </div>
            {/* <Search onSearch={this.handleSearch} /> */}
          </Toolbar>
        </AppBar>

        {/* Main container */}
        <Container
          sx={{
            background: `rgba(0, 0, 0, 0.4)`,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            objectFit: "cover",
            minWidth: "100vw",
            position: "relative",
            zIndex: "2",
          }}
        >
          {/* Returning the API Response */}

          <Paper
            sx={{
              backgroundColor: "rgba(240, 240, 240, 0.2)",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
              maxHeight: "50vh",
              top: "0px",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight={"bold"}>
              Asteroid Information
            </Typography>
            <Typography>ID : {asteroidData.id}</Typography>
            <Typography>Name : {asteroidData.name}</Typography>
            <Typography>Name (Limited): {asteroidData.name_limited}</Typography>
            <Typography>
              Absolute Magnitude (H): {asteroidData.absolute_magnitude_h}
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
              {asteroidData.estimated_diameter?.miles?.estimated_diameter_min} -
              {asteroidData.estimated_diameter?.miles?.estimated_diameter_max}
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }
}

export default withRouter(Asteroid);
