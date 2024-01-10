import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, TextField, Container, Typography, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bgVideo.mp4";

interface FormProps {}

const Form: FC<FormProps> = () => {
  const [asteroidId, setAsteroidId] = useState("");
  const navigate = useNavigate();

  //   fetchData('2000433');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("id : ", asteroidId);
      navigate(`/details/${asteroidId}`);
      // fetchData(asteroidId);
      setAsteroidId("");
    } catch (error) {
      console.log("Error (Form) : ", error);
    }
  };

  // fetch random id
  const handleRandom = async (e: FormEvent) => {
    e.preventDefault();

    try {
    console.log("none")  
    } catch (error) {
      throw new Error
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
