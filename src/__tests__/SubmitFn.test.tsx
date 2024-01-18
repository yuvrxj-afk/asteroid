import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Form from "../components/Form";

// Create an instance of the axios mock adapter
const mock = new MockAdapter(axios);

describe("Testing the fetch function", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("submits form with expected fetch URL", async () => {
    // Mock the axios.get call
    mock
      .onGet(
        "https://api.nasa.gov/neo/rest/v1/neo/2000719?api_key=xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p"
      )
      .reply(200, { ok: true });

    // Render the component
    const { getByLabelText, getByRole } = render(
      <BrowserRouter>
        <Form navigate={() => {}} />
      </BrowserRouter>
    );

    // Act: Update input value
    act(() => {
      fireEvent.change(getByLabelText(/Asteroid ID/i), {
        target: { value: "2000719" },
      });
    });

    // Act: Trigger form submission
    act(() => {
      fireEvent.click(getByRole("button", { name: /Submit/i }));
    });

    // Wait for the async operation to complete
    await waitFor(() => {
      // Assert: Check if axios.get was called with the expected URL
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(
        "https://api.nasa.gov/neo/rest/v1/neo/2000719?api_key=xdVSbTOn9TfSpyT5sdjdiNFFR3JhTKNlzmv7y70p"
      );
    });
  });
});
