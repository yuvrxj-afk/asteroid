import React, { useCallback, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Backdrop,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import bgVideo from "../assets/asteroid.mp4";
import axios from "axios";
import Search from "./Search";

interface apiResponseType {
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

const Asteroid: React.FC = () => {
  const { asteroidId } = useParams();

  const navigate = useNavigate();

  const [apiResponse, setApiResponse] = React.useState<apiResponseType>();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);

  const API_KEY = "xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p";

  //   fetch logic
  const fetchData = useCallback(
    async (id: string) => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`
        );
        if (!response.data) {
          setError(true);
          throw new Error(
            `request failed with status code : ${response.status}`
          );
          return;
        }
        // console.log(response.data);
        setApiResponse(response.data);
      } catch (error) {
        setError(true);
        console.log("Error while fetching : ", error);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    fetchData(asteroidId || "");
  }, [asteroidId, fetchData]);

  if (error) {
    navigate("/not-found");
    setError(false);
  }

  const handleSearch = (searchId: string) => {
    setLoading(true);
    navigate(`/details/${searchId}`);
    console.log("nothing");
  };

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
        <video autoPlay loop muted src={bgVideo} className="asteroid-video" />
      </div>

      {/* Top Search Bar */}
      <AppBar
        color="secondary"
        enableColorOnDark
        sx={{ background: "rgba(255, 255, 255, 0.0)", marginTop: "20px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <Typography variant="h3" color={"white"} fontWeight={"bolder"}>
              Cosmic Search
            </Typography>
          </div>
          <Search onSearch={handleSearch} />
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
        {!loading && apiResponse && (
          <Paper sx={panelStyling}>
            <Typography variant="h4" mb={2} fontWeight={"bold"}>
              Asteroid Information
            </Typography>
            <Typography>ID : {apiResponse.id}</Typography>
            <Typography>Name : {apiResponse.name}</Typography>
            <Typography>Name (Limited): {apiResponse.name_limited}</Typography>
            <Typography>
              Absolute Magnitude (H): {apiResponse.absolute_magnitude_h}
            </Typography>
            <Typography>
              Is Potentially Hazardous Asteroid:
              {apiResponse.is_potentially_hazardous_asteroid ? "Yes" : "No"}
            </Typography>
            <Typography>
              Estimated Diameter (km):
              {
                apiResponse.estimated_diameter?.kilometers
                  ?.estimated_diameter_min
              }
              -
              {
                apiResponse.estimated_diameter?.kilometers
                  ?.estimated_diameter_max
              }
            </Typography>
            <Typography>
              Estimated Diameter (miles):
              {apiResponse.estimated_diameter?.miles?.estimated_diameter_min} -
              {apiResponse.estimated_diameter?.miles?.estimated_diameter_max}
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
};
export default Asteroid;
