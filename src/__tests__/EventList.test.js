import { render } from "@testing-library/react";
import EventList from "../components/EventList";

describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", () => {
    EventListComponent.rerender(
      <EventList events={[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]} />
    );
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
});
