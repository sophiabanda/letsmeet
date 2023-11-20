import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  test("renders list of events", () => {
    render(<App />);
    const eventList = screen.getByRole("list");
    expect(eventList).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    render(<App />);
    const citySearch = screen.getByTestId("city-search");
    expect(citySearch).toBeInTheDocument();
  });
});
