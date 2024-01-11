import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Erroroid: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle = {
    // background: `url(${errorImage}) center/cover no-repeat fixed`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
  };

  const buttonStyle = {
    marginTop: "16px",
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    
    <Container sx={containerStyle}>
      <Typography variant="h5" color="error" mt={2}>
        Oops! You're lost.
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={2}>
        Something went wrong. Please go back to where you came from.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleGoBack}
        style={buttonStyle}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default Erroroid;
