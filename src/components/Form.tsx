import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, TextField, Container, Typography, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FormProps {}

const Form: FC<FormProps> = () => {
  const apiKey = `oVoQnP5Kg0o8SzKUNjQo8uihgPvpbK3wJKEDKe1G`;
  const [asteroidId, setAsteroidId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  // Fetch Data
  const fetchData = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      setApiResponse(data)
    } catch (error) {
      console.log(error);
    }
  };

  //   fetchData('2000433');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("id : ", asteroidId);
      fetchData(asteroidId);
      setAsteroidId("");
    } catch (error) {
      console.log(error);
    }
  };

// fetch random id
const randomAsteroid = (id){
    
}

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAsteroidId(e.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        border: "2px solid #000",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "24px",
        textAlign: "center",
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
            // onClick={onRandomAsteroid}
            fullWidth
            endIcon={<SearchIcon />}
          >
            Random Asteroid
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Form;
