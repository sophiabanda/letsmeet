import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    render(<EventList />);
    const eventList = screen.queryByRole("list");

    expect(eventList).toBeInTheDocument();
  });

  test("renders correct number of events", () => {
    render(<EventList events={[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]} />);
    const events = screen.getAllByRole("listitem");

    expect(events).toHaveLength(4);
  });
});
