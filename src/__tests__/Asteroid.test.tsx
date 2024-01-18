import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Importing Jest DOM extension
import Asteroid from "../components/Asteroid";
import { BrowserRouter as Router } from "react-router-dom";

const MockAsteroid = () => {
  return (
    <Router>
      <Asteroid />
    </Router>
  );
};

describe("Asteroid component", () => {
  test("renders asteroid information", () => {
    render(<MockAsteroid />);
  });
  test("Goes back to Home if Clicked", () => {
    render(<MockAsteroid />);
    const goBackElement = screen.getByTestId("homeClick");
    expect(window.location.href).toMatch("http://localhost/");
    fireEvent.click(goBackElement);
    expect(window.location.href).toMatch("/");
  });
});
