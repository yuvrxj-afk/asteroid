import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, TextField, Container, Typography, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bgVideo.mp4";
import axios from "axios";

interface FormProps {}

const Form: FC<FormProps> = () => {
  const [asteroidId, setAsteroidId] = useState("");

  const navigate = useNavigate();

  const API_KEY = "xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p";

  // const [dataSet, setDataSet] = useState([]);

  const randomData = async () => {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
    );
    if (!response.data) {
      throw new Error(`Error with status code ${response.status}`);
    }
    // setDataSet(response.data.near_earth_objects);

    const dataArray: string[] = response.data.near_earth_objects.map(
      (i: { id: string }) => i.id
    );
    return dataArray;
  };

  // fetch random id
  const handleRandom = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const dataArray: string[] = await randomData();
      console.log(dataArray);
      const number = Math.floor(Math.random() * 20);
      console.log(dataArray[number]);
      navigate(`/details/${dataArray[number]}`);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      navigate(`/details/${asteroidId}`);
      setAsteroidId("");
    } catch (error) {
      console.log("Error (Form) : ", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAsteroidId(e.target.value);
  };

  return (
    <>
      <div className="frame">
        <div className="background-video-container">
          <video
            autoPlay
            loop
            muted
            className="background-video"
            src={bgVideo}
          />
        </div>
      </div>
      <Container
        maxWidth="sm"
        sx={{
          border: "2px solid #000",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "24px",
          textAlign: "center",
          position: "relative",
          zIndex: "1",
          background: "linear-gradient(to bottom right, #aedcf0, #ffb6c1)",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="h3"
              fontFamily={"Poppins"}
              align={"center"}
              fontWeight={"bold"}
              gutterBottom
            >
              Asteroid
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    variant="outlined"
                    placeholder="Enter ID"
                    fullWidth
                    autoFocus
                    sx={{ padding: "7px" }}
                    value={asteroidId}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ height: "100%", width: "100%", padding: "12px" }}
                    color="primary"
                    disabled={!asteroidId}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRandom}
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
};

export default Form;
