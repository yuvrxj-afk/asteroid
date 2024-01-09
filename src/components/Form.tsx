import { Container, Typography } from "@mui/material";
import React from "react";

interface FormProps {
  onRandomAsteroid: () => void;
  onSubmit: () => void;
}

const Form: React.FC<FormProps> = ({ onRandomAsteroid, onSubmit }) => {
  console.log(onRandomAsteroid);
  console.log(onSubmit);
  return (
    <Container>
      <Typography variant="h4" color={"black"}  >Asteroid Details</Typography>
    </Container>
  );
};

export default Form;
