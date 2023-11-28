import { render, screen } from "@testing-library/react";
import { Event } from "../components/Event";

describe("<Event />, component", () => {
  test("renders event location", () => {
    render(<Event />);
    const locations = screen.queryByText("Location");

    expect(locations).toBeInTheDocument();
  });
});
