import { render, screen } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import mockData from "../mock-data";

const event = mockData[0];

it("renders event location", () => {
  render(<Event event={event} />);
  const location = screen.getByText(`Location: ${event.location}`);

  expect(location).toBeInTheDocument();
});

it("renders event start time", () => {
  render(<Event event={event} />);
  // const startTime = screen.getByText(`Start time: ${event.created}`);
  const startTime = screen.getByText((content) =>
    content.startsWith("Start time: ")
  );

  expect(startTime).toBeInTheDocument();
});

it("renders event details button with the title (show details)", () => {
  render(<Event event={event} />);
  const detailsButton = screen.getByRole("button", { name: /details/i });

  expect(detailsButton).toBeInTheDocument();
});

it("by default, has the event details hidden", () => {
  render(<Event event={event} />);
  const detailsSection = screen.queryByTestId("event-details");
  const detailsButton = screen.queryByRole("button", { name: /hide details/i });

  expect(detailsButton).not.toBeInTheDocument();
  expect(detailsSection).not.toBeInTheDocument();
});

it("toggles event details when user clicks the 'details' button", async () => {
  render(<Event event={event} />);
  const user = userEvent.setup();

  const detailsButton = screen.getByRole("button", { name: /details/i });

  expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /hide details/i })
  ).not.toBeInTheDocument();

  await user.click(detailsButton);

  expect(screen.getByTestId("event-details")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /hide details/i })
  ).toBeInTheDocument();

  await user.click(detailsButton);

  expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /hide details/i })
  ).not.toBeInTheDocument();
});
