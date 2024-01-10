import React, { useCallback, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import asteroidBg from "../assets/asteroidBg.jpg";

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

  const API_KEY = "xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p";

  //   fetch logic
  const fetchData = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`
      );
      if (!response.ok) {
        setError(true);
        // navigate('/not-found')
        return;
        // throw new Error(`request failed with status code : ${response.status}`)
      }
      const data = await response.json();
      // console.log(data);
      setApiResponse(data);
    } catch (error) {
      navigate("/not-found");
      console.log("Error while fetching : ", error);
    }
  };

  useEffect(() => {
    fetchData(asteroidId || "");
  }, [asteroidId, fetchData]);

  const bgStyling = {
    backgroundImage: `url(${asteroidBg})`,
    backgroundSize: "100% 100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    objectFit: "cover",
    minWidth: "100vw",
  };

  const panelStyling = {
    backgroundColor: "#f0f0f0",
    padding: "16px",
    borderRadius: "8px",
    maxHeight: "50vh",
    top: "0px",
  };

  return (
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
          <Typography variant="h4" mb={2} fontWeight={"bold"}>Asteroid Information</Typography>
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
            {apiResponse.estimated_diameter?.kilometers?.estimated_diameter_min}
            -
            {apiResponse.estimated_diameter?.kilometers?.estimated_diameter_max}
          </Typography>
          <Typography>
            Estimated Diameter (miles):
            {apiResponse.estimated_diameter?.miles?.estimated_diameter_min} -
            {apiResponse.estimated_diameter?.miles?.estimated_diameter_max}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};
export default Asteroid;
