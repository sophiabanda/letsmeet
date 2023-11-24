import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    render(<EventList />);
    const eventList = screen.queryByRole("list");

    expect(eventList).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    render(<EventList events={allEvents} />);
    const events = screen.getAllByRole("listitem");

    expect(events).toHaveLength(events.length);
  });
});
