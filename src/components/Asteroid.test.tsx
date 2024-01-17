import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // Importing Jest DOM extension
import Asteroid from "./Asteroid";
import { BrowserRouter as Router } from "react-router-dom";

describe("Asteroid component", () => {
  test("renders asteroid information", () => {
    render(
      <Router>
        <Asteroid />
      </Router>
    );
  });
});
