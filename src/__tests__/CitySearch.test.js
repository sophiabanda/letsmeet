import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";
import App from "../App";

describe("<CitySearch /> component", () => {
  test("renders text input", async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setInfoAlert={() => {}} />);
    const cityTextBox = screen.queryByRole("textbox");

    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    render(<CitySearch allLocations={[]} setInfoAlert={() => {}} />);
    const suggestionList = screen.queryByRole("list");

    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    render(<CitySearch allLocations={[]} setInfoAlert={() => {}} />);
    const user = userEvent.setup();
    const cityTextBox = screen.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = screen.queryByRole("list");

    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setInfoAlert={() => {}} />);

    // user types "Berlin" in city textbox
    const cityTextBox = screen.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = screen.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length);
  });
});

describe("<CitySearch /> integration", () => {
  it("renders suggestions list when the app is rendered", async () => {
    const user = userEvent.setup();
    render(<App />);
    const citySearchContainer = screen.getByTestId("city-search");
    const cityTextBox = within(citySearchContainer).queryByRole("textbox");

    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems =
      within(citySearchContainer).queryAllByRole("listitem");

    expect(suggestionListItems.length).toBe(allLocations.length);
  });
});

//Rendering component returns an object with info about the rendered component, including the contianer property.
//The container property contains the root DOM element of rendered component (the outermost elements that wraps the entire rendered output)
//So the entire line basically says: render <CitySearch /> and get the root DOM element of the rendered component.
