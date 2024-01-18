import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Testing the random button functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and navigates to random asteroid details", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        near_earth_objects: [
          { id: 123, name: "123" },
          { id: 456, name: "456" },
        ],
      },
    });

    // Render the component
    const { getByRole } = render(
      <BrowserRouter>
        <Form navigate={() => {}} />
      </BrowserRouter>
    );

    // Act: Trigger random button click
    act(() => {
      fireEvent.click(getByRole("button", { name: /Random Asteroid/i }));
    });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p"
      );

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    jest.restoreAllMocks();
  });
  it("fetches and navigates to random asteroid details", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        near_earth_objects: [
          { id: 123, name: "123" },
          { id: 456, name: "456" },
        ],
      },
    });

    // Render the component
    const { getByRole } = render(
      <BrowserRouter>
        <Form navigate={() => {}} />
      </BrowserRouter>
    );

    // Act: Trigger random button click
    act(() => {
      fireEvent.click(getByRole("button", { name: /Random Asteroid/i }));
    });

    await waitFor(() => {
      expect(mockedAxios.get).not.toHaveBeenCalledWith(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70w"
      );

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    jest.restoreAllMocks();
  });
});
