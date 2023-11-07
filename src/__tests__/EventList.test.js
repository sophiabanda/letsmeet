import { render } from "@testing-library/react";
import EventList from "../components/EventList";

describe("<EventList /> component", () => {
  test("has an element with 'list' role", () => {
    const view = render(<EventList />);
    expect(view.queryByRole("list")).toBeInTheDocument();
  });
  test("renders correct number of events", () => {
    const view = render(
      <EventList events={[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]} />
    );
    expect(view.getAllByRole("listitem")).toHaveLength(4);
  });
});
