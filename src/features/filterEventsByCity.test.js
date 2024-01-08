import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import { render, screen, within, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t searched for any city", () => {});

    when("the user opens the app", () => {
      render(<App />);
    });

    then("the user should see the list of all upcoming events.", async () => {
      const eventList = screen.queryByRole("list");

      await waitFor(() => {
        const EventListItems = within(eventList).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(35);
      });
    });
  });
  // ________________________________________
  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    given("the main page is open", () => {
      render(<App />);
    });

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      const citySearch = screen.getByTestId("city-search");
      expect(citySearch).toBeInTheDocument();
      const citySearchInput = within(citySearch).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "the user should recieve a list of cities (suggestions) that match what they’ve typed",
      () => {
        const citySearch = screen.getByTestId("city-search");
        const suggestionListItems =
          within(citySearch).queryAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(1);
      }
    );
  });
  // ________________________________________
  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    let citySearchInput;
    let citySearch;
    given("user was typing “Berlin” in the city textbox", async () => {
      render(<App getEvents={getEvents} />);
      const user = userEvent.setup();
      citySearch = screen.getByTestId("city-search");
      citySearchInput = within(citySearch).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });
    let suggestionListItems;
    and("the list of suggested cities is showing", () => {
      suggestionListItems = within(citySearch).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(1);
    });
    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      async () => {
        const user = userEvent.setup();
        await user.click(suggestionListItems[0]);
      }
    );
    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(citySearchInput).toHaveValue("Berlin, Germany");
      }
    );
    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const EventListDOM = screen.getByTestId("event-list");
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        const allEvents = await getEvents();
        // filtering the list of all events down to events located in Germany
        // citySearchInput.value should have the value "Berlin, Germany" at this point
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );
        expect(EventListItems).toHaveLength(berlinEvents.length);
      }
    );
  });
});
