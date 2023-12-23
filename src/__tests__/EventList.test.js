import { render, screen, waitFor, within } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";
import mockData from "../mock-data";

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

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    render(<App />);
    const eventList = screen.queryByRole("list");
    await waitFor(() => {
      const EventListItems = within(eventList).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(mockData.length);
    });
  });
});
