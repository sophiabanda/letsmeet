import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

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

describe("<App /> integration", () => {
  it("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    render(<App />);
    const citySearchContainer = screen.getByTestId("city-search");
    const CitySearchInput = within(citySearchContainer).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(citySearchContainer).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = screen.getByTestId("event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});
