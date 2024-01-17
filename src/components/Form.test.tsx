import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import { BrowserRouter } from "react-router-dom";

describe("Form component", () => {
  test("renders form without errors", () => {
    render(
      <BrowserRouter>
        <Form navigate={() => {}} />
      </BrowserRouter>
    );
  });
  test("renders Sumbit button", () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });
  test("renders Input Field", () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );
    const inputField = screen.getByLabelText("Enter Asteroid ID");
    expect(inputField).toBeInTheDocument();
  });
});
