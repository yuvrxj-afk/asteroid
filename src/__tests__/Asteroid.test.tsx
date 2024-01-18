import { fireEvent, render} from "@testing-library/react";
import "@testing-library/jest-dom"; // Importing Jest DOM extension
import Asteroid from "../components/Asteroid";
import { MemoryRouter as Router } from "react-router-dom";


const mockLocation = {state:{}};
test("checking if go back button works or not", () => {
  const { getByText } = render(
    <Router
      initialEntries={[{ pathname: "/1234567", state: mockLocation.state }]}
    >
      <Asteroid />
    </Router>
  );
  
  const backButton = getByText(/Go Back/i);
  fireEvent.click(backButton);
  expect(window.location.pathname).toBe("/");
});

