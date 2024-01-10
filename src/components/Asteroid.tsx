import React from "react";
import { Typography, Container, Paper } from "@mui/material";
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
  console.log(asteroidId);
  const navigate = useNavigate();

  const [apiResponse, setApiResponse] = React.useState<apiResponseType>();

  const API_KEY = "xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p";

  //   fetch logic
  const fetchData = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`
      );
        if(!response.ok){
          throw new Error(`request failed with status code : ${response.status}`)
        }
      const data = await response.json();
      console.log(data);
      setApiResponse(data);
    } catch (error) {
      navigate("/not-found");
      console.log("Error while fetching : ", error);
    }
  };

  React.useEffect(() => {
    // await new Promise((resolve) => setTimeout(resolve, 500));
      fetchData(asteroidId || "");
    // };
    // fetchWithDelay();
  }, [apiResponse]);

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
      {/* Returning the API Response */}
      {apiResponse && (
        <Paper sx={panelStyling}>
          <Typography variant="body2">Asteroid Information :</Typography>
          <Typography>ID : {apiResponse.id}</Typography>
          <Typography>Name : {apiResponse.name}</Typography>
          <Typography>Name (Limited): {apiResponse.name_limited}</Typography>
          <Typography>
            Absolute Magnitude (H): {apiResponse.absolute_magnitude_h}
          </Typography>
          <Typography>
            Is Potentially Hazardous Asteroid:{" "}
            {apiResponse.is_potentially_hazardous_asteroid ? "Yes" : "No"}
          </Typography>
          <Typography>
            Estimated Diameter (km):{" "}
            {apiResponse.estimated_diameter?.kilometers?.estimated_diameter_min}{" "}
            -{" "}
            {apiResponse.estimated_diameter?.kilometers?.estimated_diameter_max}
          </Typography>
          <Typography>
            Estimated Diameter (miles):{" "}
            {apiResponse.estimated_diameter?.miles?.estimated_diameter_min} -{" "}
            {apiResponse.estimated_diameter?.miles?.estimated_diameter_max}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};
export default Asteroid;
