import { ChangeEvent, FC, FormEvent, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/asteroid.mp4";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import asteroidFunFacts from "../constant/asteroid";

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
      <div className="Asteroid-video-container">
        <video autoPlay loop muted src={bgVideo} className="asteroid-video" />
      </div>

      <AppBar
        color="secondary"
        enableColorOnDark
        sx={{ background: "rgba(255, 255, 255, 0.0)", marginTop: "20px" }}
      >
        <Toolbar
         sx={{ padding:'4rem', marginLeft:'1rem'}}
        >
          <div
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", fontSize: "3em" , fontWeight:'bolder' , color:'lightgray' }}
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
          background: `rgba(0, 0, 0, 0.4)`,
          color: "white",
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
              color="secondary"
            >
              Cosmic Search
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
                    color="secondary"
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
