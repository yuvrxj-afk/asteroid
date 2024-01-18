import React, { Component } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Toolbar,
  AppBar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import bgVideo from "../assets/asteroid.mp4";
import { Typewriter } from "react-simple-typewriter";
import asteroidFunFacts from "../constant/asteroid";
import withRouter from "./withRouter";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "../index.css";

interface FormState {
  asteroidId: string;
}

interface FormProps {
  navigate: (url: string, any: any) => void;
}

class Form extends Component<FormProps, FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      asteroidId: "",
    };
  }

  API_KEY = "xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p";

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${this.state.asteroidId}?api_key=${this.API_KEY}`
      );

      if (!response.data) {
        toast.error(`Error: ${response.status}`);
      }
      const data = await response.data;

      this.props.navigate("/details", { state: data });
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  handleRandomData = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${this.API_KEY}`
      );

      if (!response.data) {
        toast.error(`Error: ${response.status}`);
      }
      const data = await response.data;
      const number = Math.floor(Math.random() * data.near_earth_objects.length);

      this.props.navigate(`/details`, {
        state: data.near_earth_objects[number],
      });
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({ asteroidId: e.target.value });
  };

  containerStyle = {
    border: "2px solid #313131",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "24px",
    textAlign: "center",
    position: "relative",
    zIndex: "1",
    background: `rgba(0, 0, 0, 0.53)`,
    color: "white",
    minHeight: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  };

  render() {
    return (
      <>
        <div className="Asteroid-video-container">
          <video autoPlay loop muted src={bgVideo} className="asteroid-video" />
        </div>
        <Toaster />
        <AppBar
          color="secondary"
          enableColorOnDark
          sx={{
            background: "rgba(255, 255, 255, 0.0)",
            marginTop: "20px",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ padding: "4rem", marginLeft: "1rem" }}>
            <div
              onClick={() => (window.location.href = "/")}
              style={{
                cursor: "pointer",
                fontSize: "3em",
                fontWeight: "bolder",
                color: "lightgray",
              }}
              data-testid = "homeClick"
            >
              <Typewriter
                loop
                cursor
                cursorStyle="_"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={1000}
                words={asteroidFunFacts}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={this.containerStyle}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography
                variant="h3"
                fontFamily={"Poppins"}
                align={"center"}
                fontWeight={"bold"}
                gutterBottom
                color="secondary"
              >
                Cosmic Search
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      label="Enter Asteroid ID"
                      fullWidth
                      type="number"
                      autoFocus
                      inputProps={{
                        style: { color: "white" },
                      }}
                      value={this.state.asteroidId}
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ height: "100%", width: "100%", padding: "12px" }}
                      color="secondary"
                      disabled={!this.state.asteroidId}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={10}>
              <Button
                color="secondary"
                onClick={this.handleRandomData}
                fullWidth
                endIcon={<SearchIcon />}
              >
                Random Asteroid
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withRouter(Form);
