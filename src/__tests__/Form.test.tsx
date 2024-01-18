import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Form from "../components/Form";

const MockForm = () => {
  return (
    <BrowserRouter>
      <Form navigate={() => {}} />
    </BrowserRouter>
  );
};

describe("Form component", () => {
  test("renders form without errors", () => {
    render(<MockForm />);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const inputField = screen.getByLabelText("Enter Asteroid ID");
    const randomButton = screen.getByRole("button", {
      name: /Random Asteroid/i,
    });
    expect(submitButton).toBeInTheDocument();
    expect(randomButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });
});
describe("validation checks", () => {
  test("only accepts numerical values from 0 to 9", () => {
    render(<MockForm />);

    const inputField = screen.getByLabelText("Enter Asteroid ID");
    fireEvent.change(inputField, { target: { value: "abc" } });
    expect(inputField).toHaveValue(null);
    fireEvent.change(inputField, { target: { value: "57474" } });
    expect(inputField).toHaveValue(57474);
  });
  test("submit button is disabled when input field is empty", () => {
    render(<MockForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    const inputField = screen.getByLabelText("Enter Asteroid ID");
    expect(submitButton).toBeDisabled();
    fireEvent.change(inputField, { target: { value: "1" } });
    expect(submitButton).not.toBeDisabled();
  });
  test("Goes back to Home if Clicked", () => {
    render(<MockForm />);

    const goBackElement = screen.getByTestId("homeClick");
    expect(window.location.href).toMatch("http://localhost/");
    fireEvent.click(goBackElement);
    expect(window.location.href).toMatch("/");
  });
});

describe("Form component : API", () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  test("submits form successfully", async () => {
    render(<MockForm />);
    fireEvent.change(screen.getByLabelText(/Enter Asteroid ID/i), {
      target: { value: "2000433" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      console.log(mockAxios.history)
      expect(mockAxios.history.get.length).not.toBe(10);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(
        `https://api.nasa.gov/neo/rest/v1/neo/2000433?api_key=xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p`
      );
    });
  });
  test("error while form submission", async () => {
    render(<MockForm />);

    fireEvent.change(screen.getByLabelText(/Enter Asteroid ID/i), {
      target: { value: "200043" },
    });

    fireEvent.click(screen.getByText(/Submit/i));
    await expect(
      screen.findAllByText(/Error: Request failed with status code 404/i)
    ).toBeTruthy();

    expect(window.location.href).toMatch("http://localhost/");
  });
});
