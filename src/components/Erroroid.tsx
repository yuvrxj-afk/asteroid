import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Erroroid: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const containerStyle = {
    // background: `url(${errorImage}) center/cover no-repeat fixed`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    filter: loading ? "blur(7px)" : "none",
  };

  const buttonStyle = {
    marginTop: "16px",
  };

  const handleGoBack = () => {
    setLoading(true);
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

      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};

export default Erroroid;
