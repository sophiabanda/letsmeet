import { render, screen } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
// import { getEvents } from "../api";

it("renders event location", () => {
  render(<Event />);
  const location = screen.getByText("Location:");

  expect(location).toBeInTheDocument();
});

it("renders event start time", () => {
  render(<Event />);
  const startTime = screen.getByText("Start time:");

  expect(startTime).toBeInTheDocument();
});

it("renders event details button with the title (show details)", () => {
  render(<Event />);
  const detailsButton = screen.getByRole("button", { name: /details/i });

  expect(detailsButton).toBeInTheDocument();
});

it("by default, has the event details hidden", () => {
  render(<Event />);
  const detailsSection = screen.queryByTestId("event-details");
  const detailsButton = screen.getByText("Hide Details");

  expect(detailsButton).not.toBeVisible();
  expect(detailsSection).not.toBeVisible();
});

it("shows event details when user clicks the 'show details' button", async () => {
  render(<Event />);
  const user = userEvent.setup();
  const detailsButton = screen.getByText("Details");
  const hideButton = screen.getByText("Hide Details");

  await user.click(detailsButton);

  expect(hideButton).toBeVisible();
});

it("hides the event details when the user clicks the 'hide details' button", async () => {
  render(<Event />);
  const user = userEvent.setup();
  const detailsButton = screen.getByText("Details");
  const hideButton = screen.getByText("Hide Details");

  await user.click(hideButton);

  expect(detailsButton).toBeVisible();
});
